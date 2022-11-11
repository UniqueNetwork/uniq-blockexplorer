import React from 'react';

import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';
import TableSortableColumnTitle from '@app/components/TableSortableColumnTitle';
import { EventsSorting } from '@app/api/graphQL/bundleEvents/types';
import FractionsTableCell from '@app/pages/Token/RFT/components/OwnersSection/FractionsTableCell';
import { DeviceSize } from '@app/hooks';
import PercentageTableCell from '@app/pages/Token/RFT/components/OwnersSection/PercentageTableCell';

export const GetOwnersColumns = (
  orderBy: EventsSorting,
  onOrderChange: (orderBy: EventsSorting) => void,
  deviceSize: DeviceSize,
) => [
  {
    dataIndex: 'account',
    key: 'account',
    render: (value: string) => (
      <AccountLinkComponent value={value} noShort={deviceSize >= DeviceSize.xl} />
    ),
    title: (
      <TableSortableColumnTitle
        dataIndex="account"
        orderBy={orderBy}
        title="Account"
        onOrderChange={onOrderChange}
      />
    ),
    width: 234,
  },
  {
    dataIndex: 'fractions',
    key: 'fractions',
    title: (
      <TableSortableColumnTitle
        dataIndex="fractions"
        orderBy={orderBy}
        title="Owned fractions"
        onOrderChange={onOrderChange}
      />
    ),
    render: (value: number) => (
      <FractionsTableCell fractions={value} totalCount={10000} />
    ),
    width: deviceSize >= DeviceSize.xl ? 100 : 234,
  },
  {
    dataIndex: 'fractions',
    key: 'fractions-owned',
    title: (
      <TableSortableColumnTitle
        dataIndex="fractions"
        orderBy={orderBy}
        title="Ownership percentage"
        onOrderChange={onOrderChange}
      />
    ),
    render: (value: number) => <PercentageTableCell value={value} />,
    width: 234,
  },
];
