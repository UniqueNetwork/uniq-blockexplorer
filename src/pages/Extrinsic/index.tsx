import React from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import { useScrollToTop } from '@app/hooks';

import ExtrinsicDetail from './components/ExtrinsicDetail';
import PagePaper from '../../components/PagePaper';
import { extrinsic as gqlExtrinsic } from '../../api/graphQL';

const DEFAULT_EXTRINSIC_LIMIT = 10;

const ExtrinsicPage = () => {
  useScrollToTop();
  const { blockIndex } = useParams();
  const where = blockIndex?.includes('-')
    ? {
        block_index: { _eq: blockIndex },
      }
    : {
        block_number: { _eq: blockIndex },
      };
  const { extrinsics, isExtrinsicFetching } = gqlExtrinsic.useGraphQlExtrinsic({
    blockIndex,
    limit: DEFAULT_EXTRINSIC_LIMIT,
    where,
  });

  if (!blockIndex) return null;

  return (
    <>
      {isExtrinsicFetching ? (
        <PagePaper>
          <SkeletonWrapper>
            <Skeleton />
          </SkeletonWrapper>
        </PagePaper>
      ) : (
        <>
          {extrinsics?.map((extrinsic, index) => (
            <PagePaper key={extrinsic.hash}>
              <ExtrinsicDetail
                blockIndex={blockIndex}
                extrinsic={extrinsic}
                index={index + 1}
              />
            </PagePaper>
          ))}
        </>
      )}
    </>
  );
};

const SkeletonWrapper = styled.div`
  padding: 0;
  display: flex;
  flex-grow: 1;

  .unique-skeleton {
    width: 100%;
    min-height: 667px;
    border-radius: var(--gap) !important;
  }
`;

export default ExtrinsicPage;
