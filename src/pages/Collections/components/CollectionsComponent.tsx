import React from 'react';
import Table from 'rc-table';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ColumnType } from 'rc-table/lib/interface';
import { Text } from '@unique-nft/ui-kit';
import PaginationComponent from '../../../components/Pagination';
import { CollectionsComponentProps } from '../types';
import LoadingComponent from '../../../components/LoadingComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { useApi } from '../../../hooks/useApi';
import { Collection } from '../../../api/graphQL';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

const getCollectionsColumns = (chainId: string): ColumnType<Collection>[] => {
  return [
    {
      dataIndex: 'collection_id',
      key: 'collection_id',
      render: (value: string, item: Collection) => <Link
        className={'collection-link'}
        to={`/${chainId}/collections/${value}`}
      >
        <Avatar size={'small'} />
        <div className={'collection-title'}>
          <Text color={'black'}>{item.name}</Text>
          <Text color={'grey-500'}>{`ID ${value}`}</Text>
        </div>
      </Link>,
      title: 'Collection',
      width: 100
    },
    // Age is calculated from timestamp after query execution
    { dataIndex: 'date_of_creation', key: 'time_difference', title: 'Date of creation', width: 100 },
    {
      dataIndex: 'owner',
      key: 'owner',
      render: (value: string) => <AccountLinkComponent value={value} />,
      title: 'Owner',
      width: 100
    },
    { dataIndex: 'holders_count', key: 'holders_count', title: 'Holders', width: 100 },
    { dataIndex: 'type', key: 'type', title: 'Type', width: 100 },
    {
      dataIndex: 'tokens_aggregate',
      key: 'event_count',
      render: (tokens: { aggregate?: { count: number }}, item) => {
        return <Link
          to={`/${chainId}/collections/${item.collection_id}`}
        >{tokens?.aggregate?.count || 0}</Link>;
      },
      title: 'Tokens',
      width: 100
    },
    { dataIndex: 'actions_count', key: 'actions_count', title: 'Action', width: 100 }
  ];
};

const CollectionsComponent = ({ className,
  count,
  data,
  loading,
  onPageChange,
  pageSize }: CollectionsComponentProps) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  return (
    <div className={className}>
      {deviceSize !== DeviceSize.sm && (
        <Table
          columns={getCollectionsColumns(currentChain.network)}
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
                {getCollectionsColumns(currentChain.network).map((column) => (
                  <div key={`column-${column.key}`}>
                    <Text color={'grey-500'}>{`${column.title}`}</Text>
                    {column.render && <>{column.render(item[column.dataIndex as keyof Collection], item, index)}</>}
                    {!column.render && <Text>{item[column.dataIndex as keyof Collection]?.toString() || ''}</Text>}
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

export default styled(CollectionsComponent)`
  .collection-link {
    display: flex;
    column-gap: var(--gap);
    svg {
      min-width: 40px;
    }
    .collection-title {
      display: flex;
      flex-direction: column;
      color: black !important;
    }
  }
`;
