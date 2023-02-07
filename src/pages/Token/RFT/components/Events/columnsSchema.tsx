import React, { FC, useCallback } from 'react';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';
import { DefaultRecordType } from 'rc-table/lib/interface';

import { formatFeeValue, timeDifference, timestampTableFormat } from '@app/utils';
import { EventsSorting } from '@app/api/graphQL/tokensEvents/types';
import TableSortableColumnTitle from '@app/components/TableSortableColumnTitle';
import { SVGIcon } from '@app/components';

import ResultTableCell from './ResultTableCell';
import ActionTableCell from './ActionTableCell';
import AccountLinkComponent from '../../../../Account/components/AccountLinkComponent';

export const getRFTEventsColumns = (
  orderBy: EventsSorting,
  onOrderChange: (orderBy: EventsSorting) => void,
  timestamp: number,
  tokenSymbol: string = '',
  isAgeColumn: boolean,
  setIsAgeColumn: (newIsAgeColumn: boolean) => void,
) => [
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
    dataIndex: 'fractions',
    key: 'fractions',
    title: 'Quantity fractions',
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

const AgeTimeHeader: FC<{
  text: string;
  icon: 'clock' | 'calendar';
  isAgeColumn: boolean;
  setIsAgeColumn: (newIsAgeColumn: boolean) => void;
}> = ({ text, icon, isAgeColumn, setIsAgeColumn }) => {
  const toogleColumn = useCallback(() => {
    setIsAgeColumn(!isAgeColumn);
  }, [isAgeColumn]);

  return (
    <Wrapper onClick={toogleColumn}>
      <ColumnTitleText color="primary-500">{text}</ColumnTitleText>
      <SVGIcon name={icon} width={24} height={24} color={'var(--color-primary-500)'} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const ColumnTitleText = styled(Text)`
  margin-right: calc(var(--gap) / 2);
`;
