import React, { useCallback, useEffect, useRef, useState } from 'react';
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
}
const SelectedAttributesInput = ({
  selectedAttrs,
  handleTagRemoveProps,
}: SelectedAttributesInputProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [hiddenTags, setHiddenTags] = useState(0);
  const tailOffsetRef = useRef<number>(0);

  const calculateHidden = useCallback(() => {
    if (!inputRef.current) return;

    const container = inputRef.current;

    let hiddenTags = 0;
    let tailOffset = 0;

    container.childNodes.forEach((item) => {
      if ((item as HTMLSpanElement).offsetTop > 50) hiddenTags++;

      if (hiddenTags === 0) {
        tailOffset =
          (item as HTMLSpanElement).offsetLeft + (item as HTMLSpanElement).offsetWidth;
      }
    });
    tailOffsetRef.current = tailOffset;
    setHiddenTags(hiddenTags);
  }, [selectedAttrs]);

  const handleTagRemove = useCallback(
    (tag: string) => {
      handleTagRemoveProps(tag);
    },
    [handleTagRemoveProps],
  );

  useEffect(() => {
    calculateHidden();
    window.addEventListener('resize', calculateHidden);

    return () => {
      window.removeEventListener('resize', calculateHidden);
    };
  }, [calculateHidden]);

  return (
    <>
      {getTags(selectedAttrs).length > 0 ? (
        <>
          <InputTagStyled
            ref={inputRef}
            value={getTags(selectedAttrs)}
            onRemoved={handleTagRemove}
          />
          {hiddenTags > 0 && <Tail offset={tailOffsetRef.current}>+{hiddenTags}</Tail>}
        </>
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
`;

const Tail = styled.div<{ offset: number }>`
  position: absolute;
  top: 38px;
  left: ${({ offset }) => offset + 'px'};
  line-height: 22px;
  margin-left: 4px;
`;

const Placeholder = styled(Text)`
  padding: 8px 16px;
  color: var(--grey-400);
  &.unique-text[class*='appearance-inline'] {
    display: block;
  }
`;

export default SelectedAttributesInput;
