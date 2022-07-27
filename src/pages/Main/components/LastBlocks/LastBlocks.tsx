import React, { useEffect } from 'react';
import { Button } from '@unique-nft/ui-kit';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { lastBlocks } from '@app/api/graphQL';
import { PagePaperWrapper, Table } from '@app/components';
import { useApi } from '@app/hooks/useApi';

import { BlockComponentProps } from '../../types';

import { getLastBlocksColumns } from './getLastBlocksColumns';
import { blocksWithTimeDifference } from './blocksWithTimeDifference';
import { HeaderWithDropdown } from '@app/pages/Main/components/HeaderWithDropdown';

export const LastBlocks = ({
  pageSize = 5,
  searchString
}: BlockComponentProps) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const linkText = 'See all';
  const linkUrl = `/${currentChain.network}/last-blocks`;

  const { blockCount, blocks, fetchMoreBlocks, isBlocksFetching } = lastBlocks.useGraphQlBlocks({
    pageSize
  });

  const onClickSeeMore = () => {
    navigate(linkUrl);
  };

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
      <HeaderWithDropdown
        title='Last blocks'
      />
      <Table
        columns={getLastBlocksColumns(currentChain.network)}
        data={blocksWithTimeDifference(blocks)}
        loading={isBlocksFetching}
        rowKey={'block_number'}
      />
      <Button
        iconRight={{
          color: '#fff',
          name: 'arrow-right',
          size: 12
        }}
        onClick={onClickSeeMore}
        role='primary'
        title='See all'
      />
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)`
  .unique-font-heading.size-2 {
    margin-bottom: calc(var(--gap) * 2);
  }

  @media (max-width: 767px) {
    button.unique-button {
      width: 100%;
    }
  }
`;
