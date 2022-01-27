import React, { FC } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';
import { Token } from '../api/graphQL';
import Picture from './Picture';
import { useApi } from '../hooks/useApi';
import { Link } from 'react-router-dom';
import AccountLinkComponent from '../pages/Account/components/AccountLinkComponent';

type TokenCardProps = Token & { className?: string };

const TokenCard: FC<TokenCardProps> = ({ className, collection, collection_id: collectionId, image_path: imagePath, owner, token_id: tokenId }) => {
  const { currentChain } = useApi();

  return (
    <div className={className}>
      <Picture
        alt={tokenId.toString()}
        src={imagePath}
      />
      <div>
        <Text>{`${collection.token_prefix || ''} #${tokenId}`}</Text>
        <div>
          <Link to={`/${currentChain ? currentChain?.network + '/' : ''}collections/${collectionId}`}>{collection.name} [ID {collectionId}]</Link>
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
    </div>
  );
};

export default styled(TokenCard)`
  max-width: 174px;
`;
