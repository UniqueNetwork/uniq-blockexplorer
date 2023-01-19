import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { useSearchParams } from 'react-router-dom';
import { LocalizedStringWithDefault } from '@unique-nft/api';

import { OPTIONS } from '@app/pages/Tokens/constants';
import { ViewType } from '@app/pages/Tokens/components/NFTsComponents/TokensComponent';
import { deviceWidth, useQueryParams } from '@app/hooks';
import { Select, SelectOptionProps, SVGIcon } from '@app/components';
import AttributesFilter from '@app/pages/Tokens/components/AttributesFilter';
import { ChosenAttributesMap } from '@app/api';
import { AttributeValue } from '@app/api/graphQL/attributes/types';

interface RightMenuProps {
  selectSort: (selected: SelectOptionProps) => void;
  selectGrid: () => void;
  selectList: () => void;
  view: ViewType;
}

export const RightMenu: FC<RightMenuProps> = ({
  selectSort,
  selectGrid,
  selectList,
  view,
}) => {
  const [queryParams] = useSearchParams();
  const { collectionId, attributes, setParamToQuery } = useQueryParams();

  const [sort, setSort] = useState<SelectOptionProps>();

  useEffect(() => {
    const sortFromQuery = queryParams.get('sort');
    const splitSort = sortFromQuery?.split('-');
    const currentSorting = OPTIONS.find((option) => {
      if (splitSort) {
        return option.sortDir === splitSort[1] && option.sortField === splitSort[0];
      }
    });
    setSort(currentSorting);
  }, [queryParams]);

  const parsedAttributes = JSON.parse(attributes || '{}')?.attributes || {};

  //attributes filter
  const [selectedAttrs, setSelectedAttrs] =
    useState<ChosenAttributesMap>(parsedAttributes);

  const filterChanged = useMemo(() => {
    const isKeysDiffer =
      Object.keys(selectedAttrs).length !== Object.keys(parsedAttributes).length;

    return (
      isKeysDiffer ||
      Object.keys(selectedAttrs).some(
        (key) => selectedAttrs[key].raw_value !== parsedAttributes[key]?.raw_value,
      )
    );
  }, [selectedAttrs, parsedAttributes]);

  const filterTokens = useCallback(
    (attributes = selectedAttrs) => {
      setParamToQuery([
        {
          name: 'attributes',
          value: JSON.stringify({ attributes }),
        },
      ]);
    },
    [selectedAttrs],
  );

  const handleCheck = useCallback(
    (checkedKey: string, attribute: AttributeValue, attributeKey: string) => {
      setSelectedAttrs((selectedAttrs) => {
        let newSelectedAttrs: ChosenAttributesMap = {};

        if (!selectedAttrs[checkedKey])
          newSelectedAttrs[checkedKey] = { ...attribute, key: attributeKey };

        for (let key in selectedAttrs) {
          if (key !== checkedKey) newSelectedAttrs[key] = selectedAttrs[key];
        }
        return newSelectedAttrs;
      });
    },
    [],
  );

  const handleApply = useCallback(() => {
    filterTokens();
  }, [filterTokens]);

  const handleTagRemove = useCallback(
    (tag: string) => {
      setSelectedAttrs((selectedAttrs) => {
        let newSelectedAttrs: ChosenAttributesMap = {};
        for (let key in selectedAttrs) {
          const attrValue = selectedAttrs[key]?.value;

          if ((attrValue as LocalizedStringWithDefault)?._ !== tag && attrValue !== tag) {
            newSelectedAttrs[key] = selectedAttrs[key];
          }
        }
        filterTokens(newSelectedAttrs);

        return newSelectedAttrs;
      });
    },
    [filterTokens],
  );

  const handleReset = useCallback(() => {
    setSelectedAttrs({});
  }, [filterTokens]);

  const handleRevert = useCallback(() => {
    setSelectedAttrs(parsedAttributes);
  }, [filterTokens, attributes]);

  return (
    <RightTabMenu className="right-tab-menu">
      {!!collectionId && (
        <AttributesFilter
          key={view}
          selectedAttrs={selectedAttrs}
          collectionId={Number(collectionId)}
          handleTagRemove={handleTagRemove}
          handleCheck={handleCheck}
          handleReset={handleReset}
          handleRevert={handleRevert}
          handleApply={handleApply}
          filterChanged={filterChanged}
        />
      )}
      {view === ViewType.Grid && (
        <SelectStyled
          options={OPTIONS}
          value={sort?.id as string}
          onChange={selectSort}
        />
      )}
      <Controls className="controls">
        <ViewButtons>
          <ViewButton onClick={selectList}>
            <SVGIcon
              color={view === ViewType.List ? 'var(--primary-500)' : ''}
              name="list"
              width={32}
              height={32}
            />
          </ViewButton>
          <ViewButton onClick={selectGrid}>
            <SVGIcon
              color={view === ViewType.Grid ? 'var(--primary-500)' : ''}
              name="grid"
              width={32}
              height={32}
            />
          </ViewButton>
        </ViewButtons>
      </Controls>
    </RightTabMenu>
  );
};

const RightTabMenu = styled.div`
  display: none;
  align-items: center;
  grid-column-gap: 44px;
  @media ${deviceWidth.biggerThan.md} {
    display: flex;
  }
`;

const SelectStyled = styled(Select)`
  width: 180px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;

const ViewButtons = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: calc(var(--gap) / 2);
`;

const ViewButton = styled.div`
  display: flex;
  cursor: pointer;
  height: 32px;
`;
