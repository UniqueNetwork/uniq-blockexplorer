import React, { useState, VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, SelectOptionProps } from '@unique-nft/ui-kit';
import { useApi } from '@app/hooks';
import { Table, PagePaperWrapper } from '@app/components';
import { Desktop, Mobile } from '@app/styles/styled-components';
import { useGraphQlLastTransfers } from '@app/api';

import { getTransferColumns } from './getTransferColumns';
import { transfersWithTimeDifference } from './transfersWithTimeDifference';
import { HeaderWithDropdown } from '../HeaderWithDropdown';
import { lastTransferOptions } from './lastTransferOptions';
import { LastTransfersCardsList } from './LastTransfersCardsList';

export type LastTransfersProps = {
  searchString?: string
  pageSize?: number
  accountId?: string
}

export const LastTransfers: VFC<LastTransfersProps> = ({
  accountId,
  pageSize = 5,
  searchString
}) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState<SelectOptionProps>(lastTransferOptions[0]);
  const linkUrl = `/${currentChain.network}/last-transfers`;
  const prettifiedBlockSearchString = searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;

  const { isTransfersFetching, transfers, transfersCount } =
    useGraphQlLastTransfers({ accountId, pageSize, searchString: prettifiedBlockSearchString });

  const onClickSeeMore = () => {
    navigate(linkUrl);
  };

  if (/[^$,-,.\d]/.test(searchString || '') || transfersCount === 0) return null;

  return (
    <Wrapper>
      <HeaderWithDropdown
        options={lastTransferOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        title='Last transfers'
      />
      <Desktop>
        <Table
          columns={getTransferColumns(
            currentChain?.symbol,
            currentChain?.network
          )}
          data={transfersWithTimeDifference(transfers)}
          loading={isTransfersFetching}
          rowKey='block_index'
        />
      </Desktop>
      <Mobile>
        <LastTransfersCardsList
          columns={getTransferColumns(
            currentChain?.symbol,
            currentChain?.network
          )}
          data={transfersWithTimeDifference(transfers)}
          loading={isTransfersFetching}
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
        title='See all'
      />
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)`
  @media (max-width: 767px) {
    button.unique-button {
      width: 100%;
    }
  }
`;
