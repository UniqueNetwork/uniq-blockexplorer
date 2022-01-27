import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';
import { Collection } from '../../../api/graphQL';
import { CollectionsComponentProps } from '../types';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { useApi } from '../../../hooks/useApi';
import Avatar from '../../../components/Avatar';
import PaginationComponent from '../../../components/Pagination';
import Table from '../../../components/Table';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import config from '../../../config';

const {
  IPFSGateway
} = config;

const getCollectionsColumns = (chainId: string) => [
  {
    dataIndex: 'collection_id',
    key: 'collection_id',
    render: (value: string, item: unknown) => <Link
      className={'collection-link'}
      to={`/${chainId}/collections/${value}`}
    >
      <Avatar
        size={'small'}
        src={(item as Collection).collection_cover ? `${IPFSGateway || ''}/${(item as Collection).collection_cover}` : undefined}
      />
      <div className={'collection-title'}>
        <Text color={'black'}>{(item as Collection).name}</Text>
        <Text color={'grey-500'}>{`ID ${value}`}</Text>
      </div>
    </Link>,
    title: 'Collection',
    width: 100
  },
  { dataIndex: 'date_of_creation', key: 'date_of_creation', title: 'Date of creation', width: 100 },
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
    render: (tokens: { aggregate?: { count: number }}, item: unknown) => {
      return <Link
        to={`/${chainId}/collections/${(item as Collection).collection_id}`}
      >{tokens?.aggregate?.count || 0}</Link>;
    },
    title: 'Tokens',
    width: 100
  },
  { dataIndex: 'actions_count', key: 'actions_count', title: 'Action', width: 100 }
];

const CollectionsComponent = ({
  className,
  count,
  data,
  loading,
  onPageChange,
  pageSize
}: CollectionsComponentProps) => {
  const deviceSize = useDeviceSize();
  const {
    currentChain
  } = useApi();

  return (
    <div className={className}>
      <Table
        columns={getCollectionsColumns(currentChain.network)}
        data={!loading && data?.length ? data : []}
        loading={loading}
        rowKey={'collection_id'}
      />
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
    &:hover {
      text-decoration: none;
    }
  }
`;
