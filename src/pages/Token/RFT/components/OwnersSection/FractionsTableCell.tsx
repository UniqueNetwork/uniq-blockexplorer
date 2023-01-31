import React, { FC } from 'react';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import { formatBlockNumber } from '@app/utils';

type FractionsTableCellProps = {
  fractions: number;
  totalCount: number;
};

const FractionsTableCell: FC<FractionsTableCellProps> = ({ fractions, totalCount }) => {
  return (
    <FractionsWrapper>
      <Text>{formatBlockNumber(fractions)}</Text>
      <Text color={'blue-grey-400'}> / {formatBlockNumber(totalCount)}</Text>
    </FractionsWrapper>
  );
};

const FractionsWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  .unique-text {
    white-space: nowrap;
  }
`;

export default FractionsTableCell;
