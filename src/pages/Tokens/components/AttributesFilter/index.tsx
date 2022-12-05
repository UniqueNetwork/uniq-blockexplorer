import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { Skeleton } from '@unique-nft/ui-kit';
import { LocalizedStringWithDefault } from '@unique-nft/api';

import { InputTag } from '@app/components';
import { useGraphQLCollectionAttributes } from '@app/api/graphQL/attributes/attributes';
import { AttributeValue, CollectionAttribute } from '@app/api/graphQL/attributes/types';
import { ChosenAttributesMap, TokenAttributeFilterItem } from '@app/api';
import { useQueryParams } from '@app/hooks';

import { Dropdown } from './Dropdown';
import AttributesFilterComponent from './AttributesFilter';

const getTags = (selectedAttrs: ChosenAttributesMap): string[] => {
  const result = [];
  for (let key in selectedAttrs) {
    const value = selectedAttrs[key]?.value;

    if (value) {
      result.push(typeof value === 'string' ? value : value._);
    }
  }

  return result;
};

const AttributesFilter = ({ collectionId }: { collectionId: number }) => {
  const { setParamToQuery, attributes } = useQueryParams();
  const [selectedAttrs, setSelectedAttrs] = useState<ChosenAttributesMap>(
    JSON.parse(attributes || '{}')?.attributes || {},
  );
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
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
    filterTokens({});
  }, [filterTokens]);

  const { isCollectionAttributesFetching, collectionAttributes } =
    useGraphQLCollectionAttributes({ collectionId });

  if (isCollectionAttributesFetching) return <Skeleton width={343} height={40} />;

  return (
    <DropdownStyled
      iconRight={{
        name: 'triangle',
        width: 8,
        height: 8,
        className: 'icon-triangle',
      }}
      dropdownRender={() => {
        return (
          <AttributesFilterComponent
            attributes={collectionAttributes || []}
            selectedAttrs={selectedAttrs}
            handleCheck={handleCheck}
            handleReset={handleReset}
            handleApply={handleApply}
          />
        );
      }}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <InputTagStyled
        key={getTags(selectedAttrs).join()}
        placeholder="All attributes"
        value={getTags(selectedAttrs)}
        onRemoved={handleTagRemove}
      />
    </DropdownStyled>
  );
};

const DropdownStyled = styled(Dropdown)`
  width: 343px;
  cursor: pointer;
  border: 1px solid var(--grey-300);
  padding-right: calc(var(--gap) * 2);
  border-radius: 4px;
  &:hover,
  &:focus-within {
    border: 1px solid var(--grey-500);
  }
`;

const InputTagStyled = styled(InputTag)`
  width: 100%;
  input {
    display: none;
  }
  .rti--container {
    overflow-x: auto;
    flex-wrap: nowrap;
    border: none;
    outline: none;
    min-height: 24px;
    max-height: 40px;
    .rti--tag {
      word-break: unset;
      flex-shrink: 0;
    }
  }
  .rti--container:hover,
  .rti--container:focus-within {
    border: none;
  }
`;

export default AttributesFilter;
