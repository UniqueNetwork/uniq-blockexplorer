import { Text } from '@unique-nft/ui-kit';
import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Token } from '@app/api';
import { getImageURL, timeDifference } from '@app/utils';
import amplitude from 'amplitude-js';

import Picture from '../../../components/Picture';

interface TokensGridProps {
  chainNetwork: string;
  tokens: Token[];
}

const TokensGrid: FC<TokensGridProps> = ({ chainNetwork, tokens }) => {
  // user analytics
  const onTokenClick = useCallback(() => {
    amplitude.getInstance().logEvent('CLICK_OPEN_NFT_CARD');
  }, []);

  return <TokenGallery>{tokens.map((token) => {
    return (
      <TokenLink
        key={`token-${token.collection_id}-${token.token_id}`}
        onClick={onTokenClick}
        to={`/${chainNetwork}/tokens/${token.collection_id}/${token.token_id}`}
      >
        <TokenPicture
          alt={`${token.token_prefix} #${token.token_id}`}
          src={getImageURL((token).image_path)}
        />
        <Text
          color={'secondary-500'}
          size='l'
          weight='regular'
        >{`${token.token_prefix} #${token.token_id}`}</Text>
        <TokenCollectionLink
          to={`/${chainNetwork}/collections/${token.collection_id}`}
        >{`${token.token_prefix} [id ${token.collection_id}]`}</TokenCollectionLink>
        <TokenDate
          color={'grey-500'}
          size='xs'
        >
          {`${timeDifference(token.date_of_creation)}`}
        </TokenDate>
      </TokenLink>
    );
  })}</TokenGallery>;
};

const TokenGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 80px;
  margin-bottom: 60px;
  justify-items: center;
  align-items: stretch;
 
  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
    grid-gap: 32px;
  }
`;

const TokenLink = styled(Link)`
  display: flex;
  flex-direction: column;
  &:hover {
    text-decoration: none;
  }
`;

const TokenDate = styled(Text)`
  margin-top: 8px;
`;

const TokenCollectionLink = styled(Link)`
`;

const TokenPicture = styled(Picture)`
  height: 380px;
  width: 380px;
  border-radius: var(--bradius);
  margin-bottom: 8px;
  
  @media (max-width: 767px) {
    height: 288px;
    width: 288px;
  }
`;

export default TokensGrid;
