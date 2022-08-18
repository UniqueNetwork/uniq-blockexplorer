import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Token } from '@app/api';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { TokenCard } from '@app/components';
import { deviceWidth } from '@app/hooks';

interface TokensGridProps {
  chainNetwork: string;
  timestamp: number | undefined;
  tokens: Token[];
}

const TokensGrid: FC<TokensGridProps> = ({ chainNetwork, timestamp, tokens }) => {
  // user analytics
  const onTokenClick = useCallback(() => {
    const path = window.location.pathname;

    if (path.includes('tokens')) {
      logUserEvents(UserEvents.Click.OPEN_NFT_CARD_FROM_NFTS_PAGE);
    }
  }, []);

  return (
    <TokenGallery>
      {tokens.map((token) => {
        return (
          <TokenLink
            key={`token-${token.collection_id}-${token.token_id}`}
            to={`/${chainNetwork}/tokens/${token.collection_id}/${token.token_id}`}
            onClick={onTokenClick}
          >
            <TokenCard
              key={`token-${token.collection_id}-${token.token_id}`}
              {...token}
              timeNow={timestamp}
            />
          </TokenLink>
        );
      })}
    </TokenGallery>
  );
};

const TokenGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: calc(var(--gap) * 1.5);
  grid-row-gap: calc(var(--gap) * 1.5);
  margin-bottom: calc(var(--gap) * 1.5);

  @media ${deviceWidth.biggerThan.xl} {
    grid-template-columns: repeat(6, 1fr);
  }

  @media ${deviceWidth.smallerThan.xxl} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${deviceWidth.smallerThan.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${deviceWidth.smallerThan.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${deviceWidth.smallerThan.xs} {
    grid-template-columns: 1fr;
  }
`;

const TokenLink = styled(Link)`
  display: flex;
  flex-direction: column;
  &:hover {
    text-decoration: none;
  }
`;

export default TokensGrid;
