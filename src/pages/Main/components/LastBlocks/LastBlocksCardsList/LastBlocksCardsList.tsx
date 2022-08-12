import React, { VFC } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';
import { ColumnType } from 'rc-table/lib/interface';

import { LoadingComponent } from '@app/components';
import { LastBlockWithTimeDif } from '@app/api';

import { LastBlocksCard } from './LastBlocksCard';

interface MobileCardsListProps {
  columns: ColumnType<LastBlockWithTimeDif>[];
  data?: LastBlockWithTimeDif[];
  loading?: boolean;
}

export const LastBlocksCardsList: VFC<MobileCardsListProps> = ({ columns, data, loading }) => {
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
        <LastBlocksCard
          columns={columns}
          item={item}
          key={item.block_number}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: calc(var(--gap) * 2);
`;
