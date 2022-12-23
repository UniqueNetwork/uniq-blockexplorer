import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { Skeleton } from '@unique-nft/ui-kit';

import { useGraphQLCollectionAttributes } from '@app/api/graphQL/attributes/attributes';
import { AttributeValue } from '@app/api/graphQL/attributes/types';
import { ChosenAttributesMap } from '@app/api';
import { deviceWidth } from '@app/hooks';
import SelectedAttributesInput from '@app/pages/Tokens/components/AttributesFilter/SelectedAttributesInput';

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
  handleRevert: () => void;
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
  handleRevert: handleRevertProps,
  filterChanged,
}: AttributesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = useCallback(() => {
    handleApplyProps();
    setIsOpen(false);
  }, [handleApplyProps]);

  const { isCollectionAttributesFetching, collectionAttributes } =
    useGraphQLCollectionAttributes({ collectionId });

  const handleCheck = useCallback(
    (checkedKey: string, attribute: AttributeValue, attributeKey: string) => {
      handleCheckProps(checkedKey, attribute, attributeKey);
    },
    [handleCheckProps, selectedAttrs],
  );

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen && filterChanged) handleRevertProps();

      setIsOpen(isOpen);
    },
    [handleRevertProps, filterChanged],
  );

  if (isCollectionAttributesFetching) return <Skeleton height={40} />;

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
        handleTagRemoveProps={handleTagRemoveProps}
      />
    </DropdownStyled>
  );
};

const DropdownStyled = styled(Dropdown)`
  width: 475px;
  cursor: pointer;
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  &:hover,
  &:focus-within {
    border: 1px solid var(--grey-500);
  }
  @media ${deviceWidth.smallerThan.xl} {
    width: calc(100% - 34px);
  }
  @media ${deviceWidth.smallerThan.lg} {
    width: 100%;
  }
`;

export default AttributesFilter;
