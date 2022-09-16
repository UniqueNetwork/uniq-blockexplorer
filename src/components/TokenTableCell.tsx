import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import Picture from './Picture';

interface TokenTableCellProps {
  chainId: string;
  tokenId: string;
  collectionId: number;
  imageUrl: string | null;
  tokenPrefix: string;
}

const TokenTableCell: FC<TokenTableCellProps> = ({
  chainId,
  collectionId,
  imageUrl,
  tokenId,
  tokenPrefix,
}) => (
  <TokenLink to={`/${chainId}/nfts/${collectionId}/${tokenId}`}>
    <TokenPicture alt={`${tokenPrefix} #${tokenId}`} src={imageUrl} />
    <TokenTitle>
      <Text color={'secondary-500'}>{`${tokenPrefix} #${tokenId}`}</Text>
    </TokenTitle>
  </TokenLink>
);

const TokenLink = styled(Link)`
  display: flex;
  column-gap: calc(var(--gap) / 2);
  svg {
    min-width: 40px;
  }
  &:hover {
    text-decoration: none;
  }
`;

const TokenPicture = styled(Picture)`
  height: 64px;
  width: 64px;
  border-radius: var(--bradius);
`;

const TokenTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: black !important;
  &:hover {
    text-decoration: none;
    .unique-text[class*='size-m'] {
      color: var(--primary-500) !important;
    }
  }
`;

export default TokenTableCell;
