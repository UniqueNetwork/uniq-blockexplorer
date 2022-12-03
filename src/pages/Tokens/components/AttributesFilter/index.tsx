import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { Skeleton } from '@unique-nft/ui-kit';

import { InputTag } from '@app/components';
import { useGraphQLCollectionAttributes } from '@app/api/graphQL/attributes/attributes';
import { AttributeValue, CollectionAttribute } from '@app/api/graphQL/attributes/types';

import { Dropdown } from './Dropdown';
import AttributesFilterComponent from './AttributesFilter';

export type ChosenAttribute = AttributeValue & Pick<CollectionAttribute, 'key'>;
export type ChosenAttributesMap = {
  [key: string]: ChosenAttribute | null;
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

const AttributesFilter = ({ collectionId }: { collectionId: number }) => {
  const [selectedAttrs, setSelectedAttrs] = useState<ChosenAttributesMap>({});

  const handleCheck = useCallback(
    (key: string, attribute: AttributeValue, attributeKey: string) => {
      setSelectedAttrs((selectedAttrs) => {
        return {
          ...selectedAttrs,
          [key]: selectedAttrs[key] ? null : { ...attribute, key: attributeKey },
        };
      });
    },
    [],
  );

  const handleReset = useCallback(() => {
    setSelectedAttrs({});
  }, []);

  const { isCollectionAttributesFetching, collectionAttributes } =
    useGraphQLCollectionAttributes({ collectionId });

  // console.log('getTags(selectedAttrs)', getTags(selectedAttrs));

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
          />
        );
      }}
    >
      <InputTagStyled
        key={getTags(selectedAttrs).join()}
        placeholder="All attributes"
        value={getTags(selectedAttrs)}
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
    cursor: pointer;
  }
  .rti--container {
    overflow-x: auto;
    flex-wrap: nowrap;
    border: none;
    outline: none;
    .rti--tag {
      word-break: unset;
    }
  }
  .rti--container:hover,
  .rti--container:focus-within {
    border: none;
  }
`;

export default AttributesFilter;
