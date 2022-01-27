import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';
import { Token } from '../api/graphQL';
import Picture from './Picture';
import { useApi } from '../hooks/useApi';
import AccountLinkComponent from '../pages/Account/components/AccountLinkComponent';

type TokenCardProps = Token & { className?: string };

const TokenCard: FC<TokenCardProps> = ({ className, collection_id: collectionId, collection_name: name, image_path: imagePath, owner, token_id: tokenId, token_prefix: prefix }) => {
  const { currentChain } = useApi();

  return (
    <Link
      className={className}
      to={`/${currentChain.network}/tokens/${tokenId}`}
    >
      <Picture
        alt={tokenId.toString()}
        src={imagePath}
      />
      <div>
        <Text>{`${prefix || ''} #${tokenId}`}</Text>
        <div>
          <Link to={`/${currentChain ? currentChain?.network + '/' : ''}collections/${collectionId}`}>{name} [ID {collectionId}]</Link>
        </div>
        <div>
          <Text
            color={'grey-500'}
            size={'s'}
          >
            Owner:
          </Text>
          <AccountLinkComponent value={owner} />
        </div>
      </div>
    </Link>
  );
};

export default styled(TokenCard)`
  max-width: 174px;
  svg {
    max-height: 174px;
  }
`;
