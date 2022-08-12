import React, { VFC } from 'react';
import styled from 'styled-components';
import { ColumnType } from 'rc-table/lib/interface';

import { LastBlockWithTimeDif } from '@app/api';

interface MobileCardProps {
  columns: ColumnType<LastBlockWithTimeDif>[];
  item: LastBlockWithTimeDif;
}

export const LastBlocksCard: VFC<MobileCardProps> = ({ columns, item }) => {
  return (
    <Wrapper>
      <CardHeader>
        <CardLeft>
          <div>{columns[0].title}</div>
          <div>{columns[0]?.render ? columns[0]?.render(item.block_number, item, 0) : item.block_number}</div>
        </CardLeft>
        <CardRight>
          {item.time_difference}
        </CardRight>
      </CardHeader>
      <div>
        <CardRow>
          <div>{columns[2].title}</div>
          <div>{columns[2]?.render ? columns[2]?.render(item.total_extrinsics, item, 2) : item.total_extrinsics}</div>
        </CardRow>
        <CardRow>
          <div>{columns[3].title}</div>
          <div>{columns[3]?.render ? columns[3]?.render(item.total_events, item, 3) : item.total_events}</div>
        </CardRow>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: var(--blue-gray-600);
  
  a {
    color: var(--link-color);
  }
  
  display: flex;
  flex-direction: column;
  grid-row-gap: var(--gap);
  border-bottom: 1px solid var(--grey-200);
  padding: var(--gap);
  
  &:first-child {
    padding-top: 0;
  }
`;

const FlexBaseline = styled.div`
  display: flex;
  grid-column-gap: var(--gap);
  align-items: baseline;
`;

const CardLeft = styled(FlexBaseline)`
  div {
    line-height: 26px;

    &:last-child {
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
    }
  }
`;

const CardHeader = styled(FlexBaseline)`
  justify-content: space-between;
`;

const CardRight = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: var(--dark);
`;

const CardRow = styled(FlexBaseline)``;
