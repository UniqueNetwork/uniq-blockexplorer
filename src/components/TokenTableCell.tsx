import { FC } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import { TokenTypeEnum } from '@app/api';

import Picture from './Picture';

interface TokenTableCellProps {
  chainId: string;
  tokenId: number;
  collectionId: number;
  imageUrl: string | null;
  tokenPrefix: string;
  type: TokenTypeEnum;
  tokenName?: string;
  iconSize?: number;
}

const TokenTableCell: FC<TokenTableCellProps> = ({
  chainId,
  collectionId,
  imageUrl,
  tokenId,
  tokenPrefix,
  type,
  tokenName,
  iconSize,
}) => (
  <TokenLink
    to={`/${chainId.toLowerCase()}/${
      type === 'NESTED' ? 'bundle' : 'nfts'
    }/${collectionId}/${tokenId}`}
  >
    <TokenPicture alt={`${tokenPrefix} #${tokenId}`} src={imageUrl} iconSize={iconSize} />
    <TokenTitle>
      <Text color="primary-500">
        {tokenName ? tokenName : `${tokenPrefix} #${tokenId}`}
      </Text>
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

const TokenPicture = styled(Picture)<{
  iconSize: number | undefined;
}>`
  height: ${({ iconSize }) => (iconSize ? iconSize : 64)}px;
  width: ${({ iconSize }) => (iconSize ? iconSize : 64)}px;
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
