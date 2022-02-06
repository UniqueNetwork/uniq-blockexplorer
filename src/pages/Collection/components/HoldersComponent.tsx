import React, { FC, useMemo } from 'react';
import { Token } from '../../../api/graphQL';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import Table from '../../../components/Table';

interface HoldersComponentProps {
  tokens: Token[]
  loading?: boolean
}

type Holder = {
  accountId: string
  tokens: number
  transfers?: number
  purchase?: number
  sale?: number
}

const columns = [
  {
    dataIndex: 'accountId',
    key: 'accountId',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'Owner',
    width: 100
  },
  { dataIndex: 'tokens', key: 'tokens', title: 'Items', width: 100 }
];

const HoldersComponent: FC<HoldersComponentProps> = ({ loading, tokens }) => {
  const holders: Holder[] = useMemo(() => {
    return tokens.reduce<Holder[]>((acc, token) => {
      const holderIndex = acc.findIndex((item) => item.accountId === token.owner);

      if (holderIndex > -1) {
        acc[holderIndex].tokens++;
      } else {
        return [...acc, { accountId: token.owner, tokens: 1 }];
      }

      return acc;
    }, []);
  }, [tokens]);

  return (
    <Table
      columns={columns}
      data={!loading ? holders : []}
      loading={loading}
      rowKey={'accountId'}
    />
  );
};

export default HoldersComponent;
