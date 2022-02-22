import { Text } from '@unique-nft/ui-kit';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Token } from '../../../api/graphQL/tokens/types';
import Picture from '../../../components/Picture';
import { timeDifference, timestampFormat } from '../../../utils/timestampUtils';
import { getImageURL } from '../../../utils/tokenImage';

interface TokensGridProps {
  chainNetwork: string;
  tokens: Token[];
}

const TokensGrid: FC<TokensGridProps> = ({ chainNetwork, tokens }) => {
  return <TokenGallery>{tokens.map((token, index) => {
    return (
      <TokenLink
        key={index}
        to={`/${chainNetwork}/tokens/${token.collection_id}/${token.token_id}`}
      >
        <TokenPicture
          alt={`${token.token_prefix} #${token.token_id}`}
          size={380}
          src={getImageURL((token).image_path)}
        />
        <Text
          color={'secondary-500'}
          size='l'
          weight='medium'
        >{`${token.token_prefix} #${token.token_id}`}</Text>
        <Text
          color={'primary-600'}
          size='s'
        >{`${token.token_prefix} [id${token.collection_id}]`}</Text>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TokenLink = styled(Link)`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  &:hover {
    text-decoration: none;
  }
`;

const TokenDate = styled(Text)`
  margin-top: 8px;
`;

const TokenPicture = styled(Picture)`
  height: 380px;
  width: 380px;
  border-radius: var(--bradius);
  margin-bottom: 8px;
`;

export default TokensGrid;
