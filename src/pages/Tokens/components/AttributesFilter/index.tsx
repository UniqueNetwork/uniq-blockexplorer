import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { Skeleton } from '@unique-nft/ui-kit';

import { InputTag } from '@app/components';
import { useGraphQLCollectionAttributes } from '@app/api/graphQL/attributes/attributes';
import { AttributeValue } from '@app/api/graphQL/attributes/types';
import { ChosenAttributesMap } from '@app/api';
import { deviceWidth } from '@app/hooks';

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
};
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

const AttributesFilter = ({
  selectedAttrs,
  collectionId,
  handleTagRemove: handleTagRemoveProps,
  handleReset: handleResetProps,
  handleApply: handleApplyProps,
  handleCheck: handleCheckProps,
}: AttributesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = useCallback(() => {
    handleApplyProps();
    setIsOpen(false);
  }, [handleApplyProps]);

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
            handleCheck={handleCheckProps}
            handleReset={handleResetProps}
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
        onRemoved={handleTagRemoveProps}
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
  @media ${deviceWidth.smallerThan.lg} {
    width: calc(100% - 34px);
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
