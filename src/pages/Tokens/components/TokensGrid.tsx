import { FC } from 'react';
import styled from 'styled-components/macro';

import { Token } from '@app/api';
import { TokenCard } from '@app/components';
import { deviceWidth, useScrollToTop } from '@app/hooks';

interface TokensGridProps {
  chainNetwork: string;
  timestamp: number | undefined;
  tokens: Token[];
}

const TokensGrid: FC<TokensGridProps> = ({ chainNetwork, timestamp, tokens }) => {
  useScrollToTop();

  return (
    <TokenGallery>
      {tokens.map((token) => (
        <TokenCard
          key={`token-${token.collection_id}-${token.token_id}`}
          {...token}
          timeNow={timestamp}
        />
      ))}
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

export default TokensGrid;
