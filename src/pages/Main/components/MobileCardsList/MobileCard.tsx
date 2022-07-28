import React, { VFC } from 'react';
import styled from 'styled-components';
import { DefaultRecordType } from 'rc-table/es/interface';

interface MobileCardProps {
  item: DefaultRecordType;
}

export const MobileCard: VFC<MobileCardProps> = () => {
  return (
    <Wrapper>
      <CardLeft>
        123
      </CardLeft>
      <CardRight>
        234
      </CardRight>
      <CardRows>
        <CardRow>
          <RowLabel>
            567
          </RowLabel>
          <RowData>
            789
          </RowData>
        </CardRow>
      </CardRows>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const CardLeft = styled.div``;
const CardRight = styled.div``;
const CardRows = styled.div``;
const CardRow = styled.div``;
const RowLabel = styled.div``;
const RowData = styled.div``;
