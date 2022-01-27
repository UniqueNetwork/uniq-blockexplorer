import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';
import { Token } from '../../../api/graphQL';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import PaginationComponent from '../../../components/Pagination';
import { useApi } from '../../../hooks/useApi';
import { TokensComponentProps } from '../types';
import Table from '../../../components/Table';

const getTokensColumns = (chainId: string) => [
  {
    dataIndex: 'id',
    key: 'id',
    render: (value: string, item: unknown) => <Link
      className={'token-link'}
      to={`/${chainId}/tokens/${value}`}
    >
      <Avatar size={'small'} />
      <div className={'token-title'}>
        <Text color={'black'}>{`${(item as Token).collection.token_prefix} #${(item as Token).id}`}</Text>
      </div>
    </Link>,
    title: 'Token',
    width: 100
  },
  {
    dataIndex: 'collection_id',
    key: 'collection_id',
    render: (value: string, item: unknown) => <Link
      className={'collection-link'}
      to={`/${chainId}/collections/${value}`}
    >
      <Avatar size={'small'} />
      <div className={'collection-title'}>
        <Text color={'black'}>{(item as Token).collection.name}</Text>
        <Text color={'grey-500'}>{`ID ${value}`}</Text>
      </div>
    </Link>,
    title: 'Collection',
    width: 100
  },
  { dataIndex: 'date_of_creation', key: 'date_of_creation', title: 'Date of creation', width: 100 },
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
      <Table
        columns={getTokensColumns(currentChain.network)}
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

export default styled(TokensComponent)`
  .token-link {
    display: flex;
    column-gap: var(--gap);
    svg {
      min-width: 40px;
    }
    .token-title {
      display: flex;
      justify-content: center;
      flex-direction: column;
      color: black !important;
    }
  }
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
