import React from 'react';

import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';
import TableSortableColumnTitle from '@app/components/TableSortableColumnTitle';
import FractionsTableCell from '@app/pages/Token/RFT/components/OwnersSection/FractionsTableCell';
import { DeviceSize } from '@app/hooks';
import PercentageTableCell from '@app/pages/Token/RFT/components/OwnersSection/PercentageTableCell';
import { OwnersSorting } from '@app/api/graphQL/rftOwners/types';

export const GetOwnersColumns = (
  orderBy: OwnersSorting,
  onOrderChange: (orderBy: OwnersSorting) => void,
  totalPieces: number,
  deviceSize: DeviceSize,
) => [
  {
    dataIndex: 'owner',
    key: 'owner',
    render: (value: string) => (
      <AccountLinkComponent value={value} noShort={deviceSize >= DeviceSize.xl} />
    ),
    title: (
      <TableSortableColumnTitle
        dataIndex="owner"
        orderBy={orderBy}
        title="Account"
        onOrderChange={onOrderChange}
      />
    ),
    width: 234,
  },
  {
    dataIndex: 'amount',
    key: 'amount',
    title: (
      <TableSortableColumnTitle
        dataIndex="amount"
        orderBy={orderBy}
        title="Owned fractions"
        onOrderChange={onOrderChange}
      />
    ),
    render: (value: number) => (
      <FractionsTableCell fractions={value} totalCount={totalPieces} />
    ),
    width: deviceSize >= DeviceSize.xl ? 100 : 234,
  },
  {
    dataIndex: 'amount',
    key: 'fractions-owned',
    title: (
      <TableSortableColumnTitle
        dataIndex="amount"
        orderBy={orderBy}
        title="Ownership percentage"
        onOrderChange={onOrderChange}
      />
    ),
    render: (value: number) => <PercentageTableCell value={value} total={totalPieces} />,
    width: 234,
  },
];
