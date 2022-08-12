import React, { VFC } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';
import { ColumnType } from 'rc-table/lib/interface';

import { LoadingComponent } from '@app/components';
import { TokenTransactionWithTimeDif } from '@app/api';

import { LastNftTransfersCard } from './LastNftTransfersCard';

interface LastTransfersCardsListProps {
  columns: ColumnType<TokenTransactionWithTimeDif>[];
  data?: TokenTransactionWithTimeDif[];
  loading?: boolean;
}

export const LastNftTransfersCardsList: VFC<LastTransfersCardsListProps> = ({
  columns,
  data,
  loading,
}) => {
  if (loading) {
    return <LoadingComponent />;
  }

  if (!loading && data?.length === 0) {
    return <Text className={'text_grey'}>No data</Text>;
  }

  return (
    <Wrapper>
      {data?.map((item) => (
        <LastNftTransfersCard columns={columns} item={item} key={item.block_index} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: calc(var(--gap) * 2);
`;
