import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { Text } from '@unique-nft/ui-kit';

import { ChosenAttributesMap } from '@app/api';
import { InputTag } from '@app/components';

export const getTags = (selectedAttrs: ChosenAttributesMap): string[] => {
  const result = [];
  for (let key in selectedAttrs) {
    const value = selectedAttrs[key]?.value;

    if (value) {
      result.push(typeof value === 'string' ? value : value._);
    }
  }

  return result;
};

interface SelectedAttributesInputProps {
  selectedAttrs: ChosenAttributesMap;
  handleTagRemoveProps: (tag: string) => void;
  hideTags: boolean;
  visibleTags: string[];
  setVisibleTags: React.Dispatch<React.SetStateAction<string[]>>;
}
const SelectedAttributesInput = ({
  selectedAttrs,
  hideTags,
  handleTagRemoveProps,
  visibleTags,
  setVisibleTags,
}: SelectedAttributesInputProps) => {
  const handleTagRemove = useCallback(
    (tag: string) => {
      setVisibleTags((currVisibleTags) => {
        const result = currVisibleTags.filter((currTag) => currTag !== tag);
        handleTagRemoveProps(tag);

        if (
          Object.values(selectedAttrs).length - result.length >= 1 &&
          result.length < currVisibleTags.length
        ) {
          const newDisplayedAttribute = Object.values(selectedAttrs).find((attr) => {
            const value = typeof attr.value === 'string' ? attr.value : attr.value._;
            return !result.includes(value) && value !== tag;
          });

          if (newDisplayedAttribute)
            result.push(
              typeof newDisplayedAttribute.value === 'string'
                ? newDisplayedAttribute.value
                : (newDisplayedAttribute.value._ as string),
            );
        }

        return result;
      });
    },
    [handleTagRemoveProps, selectedAttrs, setVisibleTags],
  );

  return (
    <>
      {getTags(selectedAttrs).length > 0 ? (
        <InputTagStyled
          key={getTags(selectedAttrs).join()}
          value={hideTags ? visibleTags : getTags(selectedAttrs)}
          onRemoved={handleTagRemove}
        />
      ) : (
        <Placeholder color="grey-400">Select attributes</Placeholder>
      )}
    </>
  );
};

const InputTagStyled = styled(InputTag)`
  width: 100%;
  input {
    display: none;
  }
  .rti--container {
    flex-wrap: wrap;
    border: none;
    outline: none;
    min-height: 24px;
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

const Placeholder = styled(Text)`
  padding: 8px 16px;
  color: var(--grey-400);
  &.unique-text[class*='appearance-inline'] {
    display: block;
  }
`;

export default SelectedAttributesInput;
