import React, { useEffect } from 'react';
import { Heading } from '@unique-nft/ui-kit';
import styled from 'styled-components';

import { lastBlocks } from '@app/api/graphQL';
import { PagePaperWrapper, Table } from '@app/components';
import { useApi } from '@app/hooks/useApi';

import { BlockComponentProps } from '../../types';

import { getLastBlocksColumns } from './getLastBlocksColumns';
import { blocksWithTimeDifference } from './blocksWithTimeDifference';

export const LastBlocks = ({
  pageSize = 5,
  searchString
}: BlockComponentProps) => {
  const { currentChain } = useApi();

  const { blockCount, blocks, fetchMoreBlocks, isBlocksFetching } = lastBlocks.useGraphQlBlocks({
    pageSize
  });

  useEffect(() => {
    const prettifiedBlockSearchString = searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;

    void fetchMoreBlocks({
      limit: pageSize,
      offset: 0,
      searchString: prettifiedBlockSearchString
    });
  }, [pageSize, searchString, fetchMoreBlocks]);

  if (/[^$,.\d]/.test(searchString || '') || blockCount === 0) return null;

  return (
    <Wrapper>
      <Heading size='2'>Last blocks</Heading>
      <Table
        columns={getLastBlocksColumns(currentChain.network)}
        data={blocksWithTimeDifference(blocks)}
        loading={isBlocksFetching}
        rowKey={'block_number'}
      />
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)`
  .unique-font-heading.size-2 {
    margin-bottom: calc(var(--gap) * 2);
  }
`;
