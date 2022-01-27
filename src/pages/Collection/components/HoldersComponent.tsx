import React, { FC, useMemo } from 'react';
import { Token } from '../../../api/graphQL';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import Table from '../../../components/Table';

interface HoldersComponentProps {
  className?: string
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
  { dataIndex: 'tokens', key: 'tokens', title: 'Tokens', width: 100 },
  { dataIndex: 'transfers', key: 'transfers', title: 'Transfers', width: 100 },
  { dataIndex: 'purchase', key: 'purchase', title: 'Purchase', width: 100 },
  { dataIndex: 'sale', key: 'sale', title: 'Sale', width: 100 }
];

const HoldersComponent: FC<HoldersComponentProps> = ({ className, loading, tokens }) => {
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
    <div className={className}>
      <Table
        columns={columns}
        data={!loading ? holders : []}
        loading={loading}
        rowKey={'accountId'}
      />
    </div>
  );
};

export default HoldersComponent;
