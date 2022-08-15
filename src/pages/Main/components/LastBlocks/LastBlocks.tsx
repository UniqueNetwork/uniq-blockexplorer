import React from 'react';
import { Button } from '@unique-nft/ui-kit';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useGraphQlBlocks } from '@app/api/graphQL';
import { PagePaperWrapper, Table } from '@app/components';
import { useApi } from '@app/hooks/useApi';
import { HeaderWithDropdown } from '@app/pages/Main/components/HeaderWithDropdown';

import { BlockComponentProps } from '../../types';
import { getLastBlocksColumns } from './getLastBlocksColumns';
import { blocksWithTimeDifference } from './blocksWithTimeDifference';
import { LastBlocksCardsList } from './LastBlocksCardsList';
import { DeviceSize, useDeviceSize } from '../../../../hooks/useDeviceSize';

export const LastBlocks = ({ pageSize = 5, searchString }: BlockComponentProps) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const deviceSize = useDeviceSize();
  const linkText = 'See all';
  const linkUrl = `/${currentChain.network}/last-blocks`;
  const prettifiedBlockSearchString =
    searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;
  const isMobile = deviceSize <= DeviceSize.sm;

  const { blockCount, blocks, isBlocksFetching, timestamp } = useGraphQlBlocks({
    pageSize,
    searchString: prettifiedBlockSearchString,
  });

  const onClickSeeMore = () => {
    navigate(linkUrl);
  };

  if (/[^$,.\d]/.test(searchString || '') || blockCount === 0) return null;

  return (
    <Wrapper>
      <HeaderWithDropdown title="Last blocks" />
      {!isMobile && (
        <Table
          columns={getLastBlocksColumns(currentChain.network)}
          data={blocksWithTimeDifference(blocks, timestamp)}
          loading={isBlocksFetching}
          rowKey={'block_number'}
        />
      )}
      {isMobile && (
        <LastBlocksCardsList
          columns={getLastBlocksColumns(currentChain.network)}
          data={!isBlocksFetching ? blocksWithTimeDifference(blocks, timestamp) : []}
          loading={isBlocksFetching}
        />
      )}
      <Button
        iconRight={{
          color: '#fff',
          name: 'arrow-right',
          size: 12,
        }}
        role="primary"
        title={linkText}
        onClick={onClickSeeMore}
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
