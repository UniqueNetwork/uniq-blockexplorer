import React, { VFC } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';

import { LoadingComponent } from '@app/components';
import { LastTransfersCard } from './LastTransfersCard';
import { ColumnType } from 'rc-table/lib/interface';
import { TransferWithTimeDif } from '@app/api';

interface MobileCardsListProps {
  columns: ColumnType<TransferWithTimeDif>[];
  data?: TransferWithTimeDif[];
  loading?: boolean;
}

export const LastTransfersCardsList: VFC<MobileCardsListProps> = ({ columns, data, loading }) => {
  if (loading) {
    return (
      <LoadingComponent />
    );
  }

  if (!loading && data?.length === 0) {
    return (
      <Text className={'text_grey'}>No data</Text>
    );
  }

  return (
    <Wrapper>
      { data?.map((item) => (
        <LastTransfersCard
          columns={columns}
          item={item}
          key={item.block_index}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: calc(var(--gap) * 2);
`;
