import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import { Token } from '../api/graphQL';
import Picture from './Picture';
import { useApi } from '../hooks/useApi';
import { shortcutText } from '../utils/textUtils';

type TokenCardProps = Token;

const TokenCard: FC<TokenCardProps> = ({
  collection_id: collectionId,
  collection_name: name,
  image_path: imagePath,
  owner,
  token_id: tokenId,
  token_prefix: prefix
}) => {
  const { currentChain } = useApi();

  return (
    <TokenCardLink
      to={`/${currentChain.network}/tokens/${collectionId}/${tokenId}`}
    >
      <TokenPicture
        alt={tokenId.toString()}
        src={imagePath}
      />
      <TokenTitle>
        <Text>{`${prefix || ''} #${tokenId}`}</Text>
        <div>
          <Link to={`/${currentChain ? currentChain?.network + '/' : ''}collections/${collectionId}`}>{name} [ID {collectionId}]</Link>
        </div>
        <TokenProperties>
          <Text
            color={'grey-500'}
            size={'xs'}
          >
            Owner:
          </Text>
          <Text
            color={'grey-500'}
            size={'xs'}
          >{shortcutText(owner)}</Text>
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
`;

const TokenProperties = styled.div`
  margin-top: calc(var(--gap) / 2);
`;

export default TokenCard;
