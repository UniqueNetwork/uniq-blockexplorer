import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';
import { useApi } from '@app/hooks';
import { getImageURL, shortcutText } from '@app/utils';
import { Token } from '@app/api';

import Picture from './Picture';

type TokenCardProps = Token;

const TokenCard: FC<TokenCardProps> = ({
  collection_id: collectionId,
  collection_name: name,
  image_path: imagePath,
  owner_normalized: ownerNormalized,
  token_id: tokenId,
  token_prefix: prefix
}) => {
  const { currentChain } = useApi();

  const imageUrl = getImageURL(imagePath);

  return (
    <TokenCardLink
      to={`/${currentChain.network}/tokens/${collectionId}/${tokenId}`}
    >
      <TokenPicture
        alt={tokenId.toString()}
        src={imageUrl}
      />
      <TokenTitle>
        <Text>{`${prefix || ''} #${tokenId}`}</Text>
        <div>
          <Link to={`/${currentChain ? currentChain?.network + '/' : ''}collections/${collectionId}`}>{name} [ID {collectionId}]</Link>
        </div>
        <TokenProperties>
          <Text
            color='grey-500'
            size='xs'
          >
            Owner: </Text>
          <Text
            color='grey-500'
            size='xs'
          >{shortcutText(ownerNormalized)}</Text>
        </TokenProperties>
      </TokenTitle>
    </TokenCardLink>
  );
};

const TokenCardLink = styled(Link)`
  transition: 50ms;
  &:hover {
    transform: translate(0, -5px);
    text-decoration: none;
  }
`;

const TokenPicture = styled(Picture)`
  width: auto;
  height: auto;
  overflow: hidden;
  border-radius: 8px;
  svg, img {
    width: 100%
  }
`;

const TokenTitle = styled.div`
  margin-top: calc(var(--gap) / 2);
  
  a {
    word-break: break-word;
  }
`;

const TokenProperties = styled.div`
  margin-top: calc(var(--gap) / 2);
`;

export default TokenCard;
