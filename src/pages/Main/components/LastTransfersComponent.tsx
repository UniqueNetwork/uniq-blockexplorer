import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';
import PaginationComponent from '../../../components/Pagination';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import { Transfer } from '../../../api/graphQL';
import { BlockComponentProps } from '../types';
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
  count,
  data,
  loading,
  onPageChange,
  pageSize
}: BlockComponentProps<Transfer[]>) => {
  const deviceSize = useDeviceSize();

  const {
    chainData, currentChain
  } = useApi();

  return (
    <div>
      <Table
        columns={getTransferColumns(
          chainData?.properties.tokenSymbol || '',
          currentChain?.network
        )}
        data={transfersWithTimeDifference(data)}
        loading={loading}
        rowKey={'block_index'}
      />
      <PaginationComponent
        count={count}
        onPageChange={onPageChange}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </div>
  );
};

export default LastTransfersComponent;
