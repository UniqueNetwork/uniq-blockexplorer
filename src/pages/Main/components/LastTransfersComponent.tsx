import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import PaginationComponent from '../../../components/Pagination';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import { Transfer, transfers as gqlTransfers } from '../../../api/graphQL';
import { LastTransfersComponentProps } from '../types';
import { timeDifference } from '../../../utils/timestampUtils';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { useApi } from '../../../hooks/useApi';
import Table from '../../../components/Table';

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

const transfersWithTimeDifference = (
  transfers: Transfer[] | undefined
): (Transfer & { time_difference: string })[] => {
  if (!transfers || !Array.isArray(transfers)) return [];

  return transfers.map((transfer: Transfer) => ({
    ...transfer,
    time_difference: transfer.timestamp ? timeDifference(transfer.timestamp) : ''
  }));
};

const LastTransfersComponent = ({
  pageSize = 10,
  searchString
}: LastTransfersComponentProps) => {
  const deviceSize = useDeviceSize();

  const { chainData, currentChain } = useApi();

  const [currentPage, setCurrentPage] = useState(1);

  const { fetchMoreTransfers, isTransfersFetching, transfers, transfersCount } =
    gqlTransfers.useGraphQlLastTransfers({ pageSize });

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;

    void fetchMoreTransfers({
      limit: pageSize,
      offset,
      searchString
    });
  }, [pageSize, searchString, currentPage, fetchMoreTransfers]);

  return (
    <>
      <Table
        columns={getTransferColumns(
          chainData?.properties.tokenSymbol || '',
          currentChain?.network
        )}
        data={transfersWithTimeDifference(transfers)}
        loading={isTransfersFetching}
        rowKey={'block_index'}
      />
      <PaginationComponent
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
