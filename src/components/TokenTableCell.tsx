import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import Avatar from './Avatar';

interface TokenTableCellProps {
  chainId: string
  tokenId: string
  collectionId: number
  imageUrl?: string
  tokenPrefix: string
}

const TokenTableCell: FC<TokenTableCellProps> = ({
  chainId,
  collectionId,
  imageUrl,
  tokenId,
  tokenPrefix
}) => {
  return (
    <TokenLink
      to={`/${chainId}/tokens/${collectionId}/${chainId}`}
    >
      <Avatar
        size={'small'}
        src={imageUrl}
      />
      <TokenTitle>
        <Text color={'black'}>{`${tokenPrefix} #${tokenId}`}</Text>
      </TokenTitle>
    </TokenLink>
  );
};

const TokenLink = styled(Link)`
  display: flex;
  column-gap: var(--gap);
  svg {
    min-width: 40px;
  }
  &:hover {
    text-decoration: none;
  }
`;

const TokenTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: black !important;
`;

export default TokenTableCell;
