import { VFC } from 'react';
import styled from 'styled-components/macro';

import { getCoverURLFromCollection } from '@app/utils/collectionUtils';
import { useCheckImageExists, useRandomColor } from '@app/hooks';

import { BlurredCover } from './BlurredCover';
import { RoundedCover } from './RoundedCover';

interface CollectionCoverProps {
  collectionId: number;
  coverSrc?: string;
  collectionName?: string;
}

// TODO also use tokens[0].token_image https://cryptousetech.atlassian.net/browse/SCAN-303
export const CollectionCover: VFC<CollectionCoverProps> = ({
  collectionId,
  coverSrc,
}) => {
  const { imgSrc } = useCheckImageExists(getCoverURLFromCollection(coverSrc));
  const color = useRandomColor();
  const collectionCoverColor = imgSrc ? 'transparent' : color;

  return (
    <Wrapper>
      <BlurredWrapper>
        <BlurredContent color={collectionCoverColor} coverSrc={imgSrc} />
      </BlurredWrapper>
      <RoundedCover collectionId={collectionId} coverSrc={imgSrc} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 88px;
  position: relative;
  width: 100%;

  @media (max-width: 767px) {
    height: 64px;
  }
`;

const BlurredContent = styled(BlurredCover)`
  @media (max-width: 767px) {
    height: 64px;
    width: 100%;
  }
`;

const BlurredWrapper = styled.div`
  overflow: hidden;
  border-top-left-radius: var(--gap);
  border-top-right-radius: var(--gap);
`;
