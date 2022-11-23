import React from 'react';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { Text } from '@unique-nft/ui-kit';

import TableSortableColumnTitle from '@app/components/TableSortableColumnTitle';
import TokenTableCell from '@app/components/TokenTableCell';
import ActionTableCell from '@app/components/EventsTable/ActionTableCell';
import { formatFeeValue, timeDifference, timestampTableFormat } from '@app/utils';
import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';
import {
  AgeTimeHeader,
  TGetEventsColumns,
} from '@app/components/EventsTable/columnsSchema';
import { TokenTypeEnum } from '@app/api';

import ResultTableCell from './ResultTableCell';

export const getBundleEventsAccountsPageColumns = ({
  orderBy,
  onOrderChange,
  timestamp,
  tokenSymbol,
  isAgeColumn,
  setIsAgeColumn,
  chainId = '',
}: TGetEventsColumns) => [
  {
    dataIndex: 'token_name',
    key: 'token_name',
    title: (
      <TableSortableColumnTitle
        dataIndex="token_name"
        orderBy={orderBy}
        title="Token"
        onOrderChange={onOrderChange}
      />
    ),
    render: (value: string, event: DefaultRecordType) => (
      <TokenTableCell
        chainId={chainId}
        collectionId={event.values.tokens[0].collection_id}
        imageUrl={event.values.tokens[0].image.fullUrl}
        tokenId={event.values.tokens[0].token_id}
        tokenName={event.values.tokens[0].token_name}
        type={event.values.tokens[0].type}
        iconSize={40}
      />
    ),
    width: 150,
  },
  {
    dataIndex: 'action',
    key: 'action',
    title: (
      <TableSortableColumnTitle
        dataIndex="action"
        orderBy={orderBy}
        title="Action"
        onOrderChange={onOrderChange}
      />
    ),
    render: (value: string) => <ActionTableCell action={value} />,
    width: 150,
  },
  {
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (value: number) => {
      return (
        <Text size="m" weight="regular" color={'color-blue-grey-600'}>
          {isAgeColumn ? timeDifference(value, timestamp) : timestampTableFormat(value)}
        </Text>
      );
    },
    title: (
      <AgeTimeHeader
        text={isAgeColumn ? 'Age' : 'Time'}
        icon={isAgeColumn ? 'clock' : 'calendar'}
        isAgeColumn={isAgeColumn}
        setIsAgeColumn={setIsAgeColumn}
      />
    ),
    width: 150,
  },
  {
    dataIndex: 'type',
    key: 'type',
    title: (
      <TableSortableColumnTitle
        dataIndex="type"
        orderBy={orderBy}
        title="Type"
        onOrderChange={onOrderChange}
      />
    ),
    render: (value: number, event: DefaultRecordType) => {
      return (
        <Text size="m" weight="regular" color={'blue-grey-600'}>
          {`${formatType(event.values.tokens[0].type)}`}
        </Text>
      );
    },
    width: 150,
  },
  {
    dataIndex: 'fee',
    key: 'fee',
    render: (value: number) => {
      return (
        <Text size="m" weight="regular" color={'blue-grey-600'}>
          {`${formatFeeValue(value || 0)} ${tokenSymbol}`}
        </Text>
      );
    },
    title: (
      <TableSortableColumnTitle
        dataIndex="fee"
        orderBy={orderBy}
        title="Fee"
        onOrderChange={onOrderChange}
      />
    ),
    width: 150,
  },
  {
    dataIndex: 'author',
    key: 'author',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'Author',
    width: 150,
  },
  {
    dataIndex: 'result',
    key: 'result',
    title: 'Result',
    render: (value: string, event: DefaultRecordType) => (
      <ResultTableCell event={event} />
    ),
    width: 200,
  },
];

const formatType = (type: TokenTypeEnum) => {
  if (type === 'NESTED') return 'Bundle';

  if (type === 'FRACTIONAL') return 'Fractional';

  return type;
};
