import React, { VFC } from 'react';
import styled from 'styled-components';
import { DefaultRecordType } from 'rc-table/es/interface';
import { Text } from '@unique-nft/ui-kit';

import { LoadingComponent } from '@app/components';
import { MobileCard } from './MobileCard';
import { ColumnType } from 'rc-table/lib/interface';

interface MobileCardsListProps<RecordType = DefaultRecordType> {
  columns?: ColumnType<RecordType>[]
  data?: DefaultRecordType[];
  loading?: boolean;
  rowKey?: string;
}

export const MobileCardsList: VFC<MobileCardsListProps> = ({ data, loading, rowKey }) => {
  console.log('data', data, 'rowKey', rowKey);

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
      { data?.map((item, index) => (
        <MobileCard
          item={item}
          key={rowKey ? item[rowKey] : index}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
