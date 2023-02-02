import React, { FC, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { DefaultRecordType } from 'rc-table/lib/interface';

import { ScrollableTable, Stub } from '@app/components';
import { DEFAULT_PAGE_SIZE } from '@app/pages/Tokens/constants';
import { useGraphQLRftHolders } from '@app/api/graphQL/rftHolders/rftHolders';
import { Holder } from '@app/api';

import AccountLinkComponent from '../../../Account/components/AccountLinkComponent';
import TableSortableColumnTitle from '../../../../components/TableSortableColumnTitle';

interface RFTHoldersComponentProps {
  collectionId?: string;
  pageSize?: number;
  defaultOrderBy?: RFTHolderSorting;
}

type RFTHolder = {
  fractions: number;

  owner: string;
  owner_normalized: string;
  count: number;
};

type RFTHolderSorting = {
  [P in keyof RFTHolder]?: 'asc_nulls_first' | 'desc_nulls_last';
};

const getColumns = (
  orderBy: RFTHolderSorting,
  onOrderChange: (orderBy: RFTHolderSorting) => void,
) => [
  {
    dataIndex: 'owner',
    key: 'owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: (
      <TableSortableColumnTitle
        dataIndex={'owner'}
        orderBy={orderBy}
        title={'Account'}
        onOrderChange={onOrderChange}
      />
    ),
    width: 200,
  },
  {
    dataIndex: 'fractions',
    key: 'fractions',
    title: (
      <TableSortableColumnTitle
        dataIndex={'fractions'}
        orderBy={orderBy}
        title={'Total fractions'}
        onOrderChange={onOrderChange}
      />
    ),
    width: 200,
  },
  {
    dataIndex: 'count',
    key: 'count',
    title: (
      <TableSortableColumnTitle
        dataIndex={'count'}
        orderBy={orderBy}
        title={'Total tokens'}
        onOrderChange={onOrderChange}
      />
    ),
    width: 100,
  },
];

const RFTHoldersComponent: FC<RFTHoldersComponentProps> = ({
  collectionId,
  pageSize = DEFAULT_PAGE_SIZE,
  defaultOrderBy = { count: 'desc_nulls_last' },
}) => {
  const [orderBy, setOrderBy] = useState<RFTHolderSorting>(defaultOrderBy);

  const { isTokenHoldersFetching, owners } = useGraphQLRftHolders({
    limit: 2_147_483_647,
    collectionId: Number(collectionId),
  });

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `holder-${(item as Holder).collection_id}-${(item as Holder).owner}`,
    [],
  );

  const onOrderChange = useCallback((_orderBy: RFTHolderSorting) => {
    setOrderBy(_orderBy);
  }, []);

  const holders = useMemo(
    () =>
      owners
        ?.reduce<RFTHolder[]>((acc, { owner, owner_normalized, amount }) => {
          const holder = acc.find((item) => item.owner_normalized === owner_normalized);

          if (holder) {
            holder.count++;
            holder.fractions += Number(amount);
          } else {
            acc.push({
              owner,
              owner_normalized,
              count: 1,
              fractions: Number(amount),
            });
          }

          return acc;
        }, [])
        .sort((item1, item2) => {
          const { count, fractions, owner } = orderBy;
          const compare = (
            order: 'asc_nulls_first' | 'desc_nulls_last',
            fisrtField: any,
            secondField2: any,
          ) =>
            (fisrtField > secondField2 ? 1 : -1) * (order === 'asc_nulls_first' ? 1 : -1);

          if (count) return compare(count, item1.count, item2.count);

          if (fractions) return compare(fractions, item1.fractions, item2.fractions);

          if (owner) return compare(owner, item1.owner, item2.owner);

          return 0;
        }) || [],
    [owners, orderBy],
  );

  if (!isTokenHoldersFetching && !owners?.length) return <Stub />;

  return (
    <HolderWrapper>
      <ScrollableTable
        columns={getColumns(orderBy, onOrderChange)}
        data={holders}
        loading={isTokenHoldersFetching}
        rowKey={getRowKey}
      />
    </HolderWrapper>
  );
};

const HolderWrapper = styled.div`
  margin-top: var(--gap);
`;

export default RFTHoldersComponent;
