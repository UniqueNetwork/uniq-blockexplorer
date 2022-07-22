import { VFC } from 'react';
import styled from 'styled-components';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';

import { BlurredCover } from './BlurredCover';
import { RoundedCover } from './RoundedCover';

interface CollectionCoverProps {
  coverSrc?: string;
  collectionName?: string;
}

export const CollectionCover: VFC<CollectionCoverProps> = ({ collectionName, coverSrc }) => {
  return (
    <Wrapper>
      <BlurredCover
        coverSrc={getCoverURLFromCollection(coverSrc)}
        name={collectionName}
      />
      <RoundedCover
        coverSrc={getCoverURLFromCollection(coverSrc)}
        name={collectionName}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 64px;
`;
