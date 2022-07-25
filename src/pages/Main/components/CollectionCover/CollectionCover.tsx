import { VFC } from 'react';
import styled from 'styled-components';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';

import { BlurredCover } from './BlurredCover';
import { RoundedCover } from './RoundedCover';
import { useImageLoader } from '@app/hooks';

interface CollectionCoverProps {
  coverSrc?: string;
  collectionName?: string;
}

export const CollectionCover: VFC<CollectionCoverProps> = ({ collectionName, coverSrc }) => {
  const imgSrc = useImageLoader(getCoverURLFromCollection(coverSrc));

  return (
    <Wrapper>
      <BlurredWrapper>
        <BlurredContent
          coverSrc={imgSrc}
        />
      </BlurredWrapper>
      <RoundedCover
        coverSrc={imgSrc}
        name={collectionName}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 87px;
  position: relative;
  width: 100%;
`;

const BlurredContent = styled(BlurredCover)`
  
`;

const BlurredWrapper = styled.div`
  overflow: hidden;
  border-top-left-radius: var(--gap);
  border-top-right-radius: var(--gap);
`;
