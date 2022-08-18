import { VFC } from 'react';
import styled from 'styled-components';
import { ColumnType } from 'rc-table/lib/interface';

import { TokenTransactionWithTimeDif } from '@app/api';
import { deviceWidth } from '@app/hooks';

interface MobileCardProps {
  columns: ColumnType<TokenTransactionWithTimeDif>[];
  item: TokenTransactionWithTimeDif;
}

export const LastNftTransfersCard: VFC<MobileCardProps> = ({ columns, item }) => (
  <Wrapper>
    <CardHeader>
      <CardLeft>
        <div>
          {columns[0]?.render
            ? columns[0]?.render(item.token_id, item, 0)
            : item.token_id}
        </div>
      </CardLeft>
      <CardRight>{item.time_difference}</CardRight>
    </CardHeader>
    <CardBody>
      <CardRow>
        <div>{columns[2].title}</div>
        <div>
          {columns[2]?.render
            ? columns[2]?.render(item.collection_name, item, 2)
            : item.collection_name}
        </div>
      </CardRow>
      <CardRow>
        <div>{columns[4].title}</div>
        <div>
          {columns[4]?.render
            ? columns[4]?.render(item.owner_normalized, item, 4)
            : item.owner_normalized}
        </div>
      </CardRow>
      <CardRow>
        <div>{columns[3].title}</div>
        <div>
          {columns[3]?.render
            ? columns[3]?.render(item.block_index, item, 3)
            : item.block_index}
        </div>
      </CardRow>
      <CardRow>
        <div>{columns[4].title}</div>
        <div>
          {columns[4]?.render
            ? columns[4]?.render(item.to_owner_normalized, item, 4)
            : item.to_owner_normalized}
        </div>
      </CardRow>
    </CardBody>
  </Wrapper>
);

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
  align-items: center;
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

const CardBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--gap);
  align-items: baseline;
  justify-content: space-between;

  @media ${deviceWidth.smallerThan.xs} {
    display: flex;
    flex-direction: column;
  }
`;

const CardRight = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--dark);
`;

const CardRow = styled(FlexBaseline)`
  span {
    font-size: 14px !important;
    line-height: 22px !important;
  }
`;
