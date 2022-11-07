import { FC } from 'react';
import styled from 'styled-components/macro';

import { deviceWidth, useScrollToTop } from '@app/hooks';
import { Token } from '@app/api';

import BundleCard from './BundleCard';

interface BundlesGridProps {
  chainNetwork: string;
  timestamp: number | undefined;
  bundles: Token[];
}

const BundlesGrid: FC<BundlesGridProps> = ({ chainNetwork, timestamp, bundles }) => {
  useScrollToTop();

  return (
    <BundlesGallery>
      {bundles.map((bundle) => (
        <BundleCard
          key={`token-${bundle.collection_id}-${bundle.token_id}`}
          {...bundle}
          timeNow={timestamp}
        />
      ))}
    </BundlesGallery>
  );
};

const BundlesGallery = styled.div`
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

export default BundlesGrid;
