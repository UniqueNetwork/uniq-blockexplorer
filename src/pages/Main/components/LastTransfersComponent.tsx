import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heading, Text } from '@unique-nft/ui-kit';

import { Pagination, Table } from '@app/components';
import { Transfer, transfers as gqlTransfers } from '@app/api/graphQL';
import { timeDifference } from '@app/utils';
import useDeviceSize, { DeviceSize } from '@app/hooks/useDeviceSize';
import { useApi } from '@app/hooks';

import { LastTransfersComponentProps } from '../types';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

const getTransferColumns = (tokenSymbol: string, chainId?: string) => [
  {
    dataIndex: 'block_index',
    key: 'block_index',
    render: (value: string) => <Link to={`/${chainId ? chainId + '/' : ''}extrinsic/${value}`}>{value}</Link>,
    title: 'Extrinsic',

    width: 100
  },
  { dataIndex: 'time_difference', key: 'age', title: 'Age', width: 100 },
  {
    dataIndex: 'from_owner',
    key: 'from_owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'From',
    width: 100
  },
  {
    dataIndex: 'to_owner',
    key: 'to_owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'To',
    width: 100
  },
  /* TODO: due to API issues - amount of some transactions is object which is, for now, should be translated as zero */
  {
    dataIndex: 'amount',
    key: 'amount',
    render: (value: number) => (
      <Text size={'s'}>{`${(Number(value) && value) || 0} ${tokenSymbol}`}</Text>
    ),
    title: 'Amount',
    width: 100
  }
];

const transfersWithTimeDifference = (transfers: Transfer[] | undefined, timestamp: number | undefined): (Transfer & { time_difference: string })[] => {
  if (!transfers || !Array.isArray(transfers)) {
    return [];
  }

  return transfers.map((transfer: Transfer) => ({
    ...transfer,
    time_difference: transfer.timestamp ? timeDifference(transfer.timestamp, timestamp) : ''
  }));
};

const LastTransfersComponent = ({
  accountId,
  pageSize = 5,
  searchString
}: LastTransfersComponentProps) => {
  const deviceSize = useDeviceSize();

  const { currentChain } = useApi();

  const [currentPage, setCurrentPage] = useState(1);

  const { fetchMoreTransfers, isTransfersFetching, timestamp, transfers, transfersCount } =
    gqlTransfers.useGraphQlLastTransfers({ accountId, pageSize });

  useEffect(() => {
    const prettifiedBlockSearchString = searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;
    const offset = (currentPage - 1) * pageSize;

    void fetchMoreTransfers({
      limit: pageSize,
      offset,
      searchString: prettifiedBlockSearchString
    });
  }, [pageSize, searchString, currentPage, fetchMoreTransfers, accountId]);

  if (/[^$,-,.\d]/.test(searchString || '') || transfersCount === 0) return null;

  return (
    <>
      <Heading size={'2'}>{'Last transfers'}</Heading>
      <Table
        columns={getTransferColumns(
          '',
          currentChain?.network
        )}
        data={transfersWithTimeDifference(transfers, timestamp)}
        loading={isTransfersFetching}
        rowKey={'block_index'}
      />
      <Pagination
        count={transfersCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </>
  );
};

export default LastTransfersComponent;
