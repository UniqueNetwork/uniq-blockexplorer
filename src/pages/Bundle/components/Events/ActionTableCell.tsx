import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { Text } from '@unique-nft/ui-kit';

import { SVGIcon } from '@app/components';
import { IconType } from '@app/images/icons';

const ActionTableCell: FC<{ action: string }> = ({ action }) => {
  const icons: { [key: string]: IconType } = {
    ItemCreated: 'checkCircle',
    Transfer: 'transfer',
    Burned: 'fire',
  };

  const actions: { [key: string]: string } = {
    ItemCreated: 'Mint',
    Transfer: 'Transfer',
    Burned: 'Burn',
  };
  return (
    <Cell>
      <SVGIcon name={icons[action]} width={16} height={16} />
      <Text size={'m'} color={'additional-dark'}>
        {actions[action]}
      </Text>
    </Cell>
  );
};

export default ActionTableCell;

const Cell = styled.div`
  display: flex;
  gap: calc(var(--gap) / 2);
`;
