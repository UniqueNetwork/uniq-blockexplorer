import React, { FC } from 'react';
import { Text } from '@unique-nft/ui-kit';

import { formatBlockNumber } from '@app/utils';

type FractionsTableCellProps = {
  fractions: number;
  totalCount: number;
};

const FractionsTableCell: FC<FractionsTableCellProps> = ({ fractions, totalCount }) => {
  return (
    <>
      <Text>{formatBlockNumber(fractions)}</Text>
      <Text color={'blue-grey-400'}> / {formatBlockNumber(totalCount)}</Text>
    </>
  );
};

export default FractionsTableCell;
