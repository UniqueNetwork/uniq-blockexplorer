import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { Skeleton } from '@unique-nft/ui-kit';
import { LocalizedStringWithDefault } from '@unique-nft/api';

import { useGraphQLCollectionAttributes } from '@app/api/graphQL/attributes/attributes';
import { AttributeValue } from '@app/api/graphQL/attributes/types';
import { ChosenAttributesMap } from '@app/api';
import { DeviceSize, deviceWidth, useDeviceSize } from '@app/hooks';
import SelectedAttributesInput, {
  getTags,
} from '@app/pages/Tokens/components/AttributesFilter/SelectedAttributesInput';

import { Dropdown } from './Dropdown';
import AttributesFilterComponent from './AttributesFilter';

type AttributesFilterProps = {
  selectedAttrs: ChosenAttributesMap;
  collectionId: number;
  handleCheck: (
    checkedKey: string,
    attribute: AttributeValue,
    attributeKey: string,
  ) => void;
  handleApply: () => void;
  handleReset: () => void;
  handleTagRemove: (tag: string) => void;
  filterChanged?: boolean;
};

const AttributesFilter = ({
  selectedAttrs,
  collectionId,
  handleTagRemove: handleTagRemoveProps,
  handleReset: handleResetProps,
  handleApply: handleApplyProps,
  handleCheck: handleCheckProps,
  filterChanged,
}: AttributesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hideTags, setHideTags] = useState(false);
  const [visibleTags, setVisibleTags] = useState<string[]>(getTags(selectedAttrs));
  const [, setHasAttributeOnNewLine] = useState(false);
  const deviceSize = useDeviceSize();

  useEffect(() => {
    if (hideTags && Object.keys(selectedAttrs).length - visibleTags.length < 0) {
      setHideTags(false);
    }
  }, [selectedAttrs, visibleTags, hideTags]);

  useEffect(() => {
    if (!hideTags) setVisibleTags(getTags(selectedAttrs));
  }, [hideTags, selectedAttrs]);

  useEffect(() => {
    const dropdownInputHeight = deviceSize <= DeviceSize.md ? 124 : 40;
    setHasAttributeOnNewLine((hasAttributeOnNewLine) => {
      if (hasAttributeOnNewLine)
        setHideTags((dropdownRef.current?.clientHeight || 0) > dropdownInputHeight);

      return (dropdownRef.current?.clientHeight || 0) > dropdownInputHeight;
    });
  }, [selectedAttrs]);

  useEffect(() => {
    if (hideTags && Object.keys(selectedAttrs).length - visibleTags.length > 0) {
      let span = document.getElementById('hiddenTagsCount');

      if (!span) {
        span = document.createElement('span');
        span.className =
          'unique-text size-s weight-regular color-secondary-500 appearance-inline';
        span.id = 'hiddenTagsCount';
      }

      span.textContent = `+${Object.keys(selectedAttrs).length - visibleTags.length}`;
      const container = document.getElementsByClassName('rti--container');
      container[0].appendChild(span);
    }
  }, [hideTags, selectedAttrs, visibleTags]);

  const handleApply = useCallback(() => {
    handleApplyProps();
    setIsOpen(false);
  }, [handleApplyProps]);

  const { isCollectionAttributesFetching, collectionAttributes } =
    useGraphQLCollectionAttributes({ collectionId });

  const handleCheck = useCallback(
    (checkedKey: string, attribute: AttributeValue, attributeKey: string) => {
      if (selectedAttrs[checkedKey]) {
        const tag =
          typeof selectedAttrs[checkedKey].value === 'string'
            ? selectedAttrs[checkedKey].value
            : (selectedAttrs[checkedKey].value as LocalizedStringWithDefault)._;
        setVisibleTags((currVisibleTags) => {
          const result = currVisibleTags.filter((currTag) => currTag !== tag);

          if (currVisibleTags.length === Object.values(selectedAttrs).length) {
            setHideTags(false);
          }

          if (
            Object.values(selectedAttrs).length - result.length >= 1 &&
            result.length < currVisibleTags.length
          ) {
            const newDisplayedAttribute = Object.values(selectedAttrs).find((attr) => {
              const value = typeof attr.value === 'string' ? attr.value : attr.value._;
              return !result.includes(value);
            });
            result.push(
              typeof newDisplayedAttribute?.value === 'string'
                ? newDisplayedAttribute?.value
                : (newDisplayedAttribute?.value._ as string),
            );
          }

          return result;
        });
      }

      handleCheckProps(checkedKey, attribute, attributeKey);
    },
    [handleCheckProps, selectedAttrs, visibleTags, hideTags],
  );

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen && filterChanged) handleResetProps();

      setIsOpen(isOpen);
    },
    [handleResetProps, filterChanged],
  );

  if (isCollectionAttributesFetching) return <Skeleton width={475} height={40} />;

  return (
    <DropdownStyled
      ref={dropdownRef}
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
            handleReset={handleResetProps}
            handleApply={handleApply}
            filterChanged={!!filterChanged}
          />
        );
      }}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <SelectedAttributesInput
        selectedAttrs={selectedAttrs}
        hideTags={hideTags}
        visibleTags={visibleTags}
        setVisibleTags={setVisibleTags}
        handleTagRemoveProps={handleTagRemoveProps}
      />
    </DropdownStyled>
  );
};

const DropdownStyled = styled(Dropdown)`
  width: 475px;
  cursor: pointer;
  border: 1px solid var(--grey-300);
  padding-right: calc(var(--gap) * 2);
  border-radius: 4px;
  &:hover,
  &:focus-within {
    border: 1px solid var(--grey-500);
  }
  @media ${deviceWidth.smallerThan.lg} {
    width: calc(100% - 34px);
  }
`;

export default AttributesFilter;
