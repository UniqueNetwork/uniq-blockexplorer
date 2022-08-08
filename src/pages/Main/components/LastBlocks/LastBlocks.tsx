import React, { useEffect } from 'react';
import { Button } from '@unique-nft/ui-kit';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useGraphQlBlocks } from '@app/api/graphQL';
import { PagePaperWrapper, Table } from '@app/components';
import { useApi } from '@app/hooks/useApi';
import { Desktop, Mobile } from '@app/styles/styled-components';

import { BlockComponentProps } from '../../types';

import { getLastBlocksColumns } from './getLastBlocksColumns';
import { blocksWithTimeDifference } from './blocksWithTimeDifference';
import { HeaderWithDropdown } from '@app/pages/Main/components/HeaderWithDropdown';
import { LastBlocksCardsList } from './LastBlocksCardsList';

export const LastBlocks = ({
  pageSize = 5,
  searchString
}: BlockComponentProps) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const linkText = 'See all';
  const linkUrl = `/${currentChain.network}/last-blocks`;
  const prettifiedBlockSearchString = searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;

  const { blockCount, blocks, isBlocksFetching, timestamp } = useGraphQlBlocks({
    pageSize,
    searchString: prettifiedBlockSearchString
  });

  const onClickSeeMore = () => {
    navigate(linkUrl);
  };

  if (/[^$,.\d]/.test(searchString || '') || blockCount === 0) return null;

  return (
    <Wrapper>
      <HeaderWithDropdown
        title='Last blocks'
      />
      <Desktop>
        <Table
          columns={getLastBlocksColumns(currentChain.network)}
          data={blocksWithTimeDifference(blocks, timestamp)}
          loading={isBlocksFetching}
          rowKey={'block_number'}
        />
      </Desktop>
      <Mobile>
        <LastBlocksCardsList
          columns={getLastBlocksColumns(currentChain.network)}
          data={!isBlocksFetching ? blocksWithTimeDifference(blocks, timestamp) : []}
          loading={isBlocksFetching}
        />
      </Mobile>
      <Button
        iconRight={{
          color: '#fff',
          name: 'arrow-right',
          size: 12
        }}
        onClick={onClickSeeMore}
        role='primary'
        title={linkText}
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
