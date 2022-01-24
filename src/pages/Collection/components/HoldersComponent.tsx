import React, { FC, useMemo } from 'react';
import { Token } from '../../../api/graphQL';
import { ColumnType } from 'rc-table/lib/interface';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import Table from 'rc-table';
import LoadingComponent from '../../../components/LoadingComponent';
import { Text } from '@unique-nft/ui-kit';

interface HoldersComponentProps {
  className?: string
  tokens: Token[]
  loading?: boolean
}

type Holder = {
  accountId: string
  tokens: number
  transfers?: number
  purchase?: number
  sale?: number
}

const columns: ColumnType<Holder>[] = [
  {
    dataIndex: 'accountId',
    key: 'accountId',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'Owner',
    width: 100
  },
  { dataIndex: 'tokens', key: 'tokens', title: 'Tokens', width: 100 },
  { dataIndex: 'transfers', key: 'transfers', title: 'Transfers', width: 100 },
  { dataIndex: 'purchase', key: 'purchase', title: 'Purchase', width: 100 },
  { dataIndex: 'sale', key: 'sale', title: 'Sale', width: 100 }
];

const HoldersComponent: FC<HoldersComponentProps> = ({ className, loading, tokens }) => {
  const deviceSize = useDeviceSize();

  const holders: Holder[] = useMemo(() => {
    return tokens.reduce<Holder[]>((acc, token) => {
      const holderIndex = acc.findIndex((item) => item.accountId === token.owner);

      if (holderIndex > -1) {
        acc[holderIndex].tokens++;
      } else {
        return [...acc, { accountId: token.owner, tokens: 1 }];
      }

      return acc;
    }, []);
  }, [tokens]);

  return (
    <div className={className}>
      {deviceSize !== DeviceSize.sm && (
        <Table
          columns={columns}
          data={!loading ? holders : []}
          emptyText={!loading ? 'No data' : <LoadingComponent />}
          rowKey={'collection_id'}
        />
      )}
      {deviceSize === DeviceSize.sm && (
        <div className={'table-sm'}>
          {loading && <LoadingComponent />}
          {!loading && holders?.length === 0 && <Text className={'text_grey'}>No data</Text>}
          {!loading &&
            holders?.map((item, index) => (
              <div
                className={'row'}
                key={item.accountId}
              >
                {columns.map((column) => (
                  <div key={`column-${column.key || ''}`}>
                    <Text color={'grey-500'}>{`${column?.title || ''}`}</Text>
                    {column.render && <>{column.render(item[column.dataIndex as keyof Holder], item, index)}</>}
                    {!column.render && <Text>{item[column.dataIndex as keyof Holder]?.toString() || ''}</Text>}
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HoldersComponent;
