import React, { FC } from 'react';
import styled from 'styled-components';
import { ColumnType } from 'rc-table/lib/interface';
import Table from 'rc-table';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';
import { Collection, Token } from '../../../api/graphQL';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import LoadingComponent from '../../../components/LoadingComponent';
import PaginationComponent from '../../../components/Pagination';
import { useApi } from '../../../hooks/useApi';
import { TokensComponentProps } from '../types';

const getTokensColumns = (chainId: string): ColumnType<Token>[] => {
  return [
    {
      dataIndex: 'id',
      key: 'id',
      render: (value: string, item: Token) => <Link
        className={'token-link'}
        to={`/${chainId}/tokens/${value}`}
      >
        <Avatar size={'small'} />
        <div className={'token-title'}>
          <Text color={'black'}>{`${item.collection.token_prefix} #${item.id}`}</Text>
        </div>
      </Link>,
      title: 'Token',
      width: 100
    },
    {
      dataIndex: 'collection_id',
      key: 'collection_id',
      render: (value: string, item: Token) => <Link
        className={'collection-link'}
        to={`/${chainId}/collections/${value}`}
      >
        <Avatar size={'small'} />
        <div className={'collection-title'}>
          <Text color={'black'}>{item.collection.name}</Text>
          <Text color={'grey-500'}>{`ID ${value}`}</Text>
        </div>
      </Link>,
      title: 'Collection',
      width: 100
    },
    // Age is calculated from timestamp after query execution
    { dataIndex: 'date_of_creation', key: 'time_difference', title: 'Date of creation', width: 100 },
    { dataIndex: 'type', key: 'type', title: 'Type', width: 100 },
    {
      dataIndex: 'owner',
      key: 'owner',
      render: (value: string) => <AccountLinkComponent value={value} />,
      title: 'Owner',
      width: 100
    },
    {
      dataIndex: 'transfers_count',
      key: 'transfers_count',
      title: 'Transfers',
      width: 100
    }
  ];
};

const TokensComponent: FC<TokensComponentProps> = ({ className,
  count,
  data,
  loading,
  onPageChange,
  pageSize }) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  return (
    <div className={className}>
      {deviceSize !== DeviceSize.sm && (
        <Table
          columns={getTokensColumns(currentChain.network)}
          data={!loading && data?.length ? data : []}
          emptyText={!loading ? 'No data' : <LoadingComponent />}
          rowKey={'collection_id'}
        />
      )}
      {deviceSize === DeviceSize.sm && (
        <div className={'table-sm'}>
          {loading && <LoadingComponent />}
          {!loading && data?.length === 0 && <Text className={'text_grey'}>No data</Text>}
          {!loading &&
            data?.map((item, index) => (
              <div
                className={'row'}
                key={item.collection_id}
              >
                {getTokensColumns(currentChain.network).map((column) => (
                  <div key={`column-${column.key}`}>
                    <Text color={'grey-500'}>{`${column.title}`}</Text>
                    {column.render && <>{column.render(item[column.dataIndex as keyof Token], item, index)}</>}
                    {!column.render && <Text>{item[column.dataIndex as keyof Token]?.toString() || ''}</Text>}
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
      <PaginationComponent
        count={count || 0}
        onPageChange={onPageChange}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </div>
  );
};

export default styled(TokensComponent)`
`;
