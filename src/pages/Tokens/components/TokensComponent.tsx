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
import config from '../../../config';

const { IPFSGateway } = config;

const getTokensColumns = (chainId: string) => [
  {
    dataIndex: 'id',
    key: 'id',
    render: (value: string, item: unknown) => <TokenLink
      to={`/${chainId}/tokens/${(item as Token).collection_id}/${value}`}
    >
      <Avatar
        size={'small'}
        src={(item as Token).image_path}
      />
      <TokenTitle>
        <Text color={'black'}>{`${(item as Token).token_prefix} #${(item as Token).token_id}`}</Text>
      </TokenTitle>
    </TokenLink>,
    title: 'Token',
    width: 100
  },
  {
    dataIndex: 'collection_id',
    key: 'collection_id',
    render: (value: string, item: unknown) => <CollectionLink
      to={`/${chainId}/collections/${value}`}
    >
      <Avatar
        size={'small'}

        src={(item as Token).collection_cover ? `${IPFSGateway || ''}/${(item as Token).collection_cover}` : undefined}
      />
      <CollectionTitle>
        <Text color={'black'}>{(item as Token).collection_name}</Text>
        <Text color={'grey-500'}>{`ID ${value}`}</Text>
      </CollectionTitle>
    </CollectionLink>,
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

const TokensComponent: FC<TokensComponentProps> = ({
  count,
  data,
  loading,
  onPageChange,
  pageSize
}) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  return (
    <>
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
    </>
  );
};

const TokenLink = styled(Link)`
  display: flex;
  column-gap: var(--gap);
  svg {
    min-width: 40px;
  }
  &:hover {
    text-decoration: none;
  }
`;

const TokenTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: black !important;
`;

const CollectionLink = styled(Link)`
  display: flex;
  column-gap: var(--gap);
  svg {
    min-width: 40px;
  }
  &:hover {
    text-decoration: none;
  }
`;

const CollectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  color: black !important;
`;

export default TokensComponent;
