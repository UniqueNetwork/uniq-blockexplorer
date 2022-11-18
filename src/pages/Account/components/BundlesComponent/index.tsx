import React, { FC, useCallback } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import { useApi, useQueryParams } from '@app/hooks';
import { Token, useGraphQlBundles } from '@app/api';
import { defaultSorting } from '@app/pages/Collections/constants';
import { getMirrorFromEthersToSubstrate } from '@app/utils';
import { normalizeSubstrate } from '@app/utils/normalizeAccount';
import BundleCard from '@app/components/BundleCard';

interface BundlesComponentProps {
  accountId: string;
}

const pageSize = 6;

const BundlesComponent: FC<BundlesComponentProps> = ({ accountId }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const { searchString } = useQueryParams();
  const [queryParams, setQueryParams] = useSearchParams();

  // assume that we got the substrate address
  let substrateAddress = accountId;

  // if we get an ether address
  if (/0x[0-9A-Fa-f]{40}/g.test(accountId)) {
    substrateAddress = getMirrorFromEthersToSubstrate(accountId, currentChain.network);
  }

  const { bundles, bundlesCount } = useGraphQlBundles({
    filter: {
      _or: [
        { owner: { _eq: accountId } },
        { owner_normalized: { _eq: normalizeSubstrate(substrateAddress) } },
      ],
      burned: { _eq: 'false' },
    },
    pageSize,
    searchString,
    offset: 0,
  });

  const onClickSeeMore = useCallback(() => {
    let params: { accountId?: string; search?: string; sort?: string } = {};
    params.sort = defaultSorting;

    if (accountId) {
      params.accountId = accountId;
    }

    if (searchString) {
      params.search = searchString;
    }

    setQueryParams(queryParams);
    navigate({
      pathname: `/${currentChain.network.toLowerCase()}/bundles/`,
      search: `?${createSearchParams(params)}`,
    });
  }, [
    accountId,
    searchString,
    setQueryParams,
    queryParams,
    navigate,
    currentChain.network,
  ]);

  const showButton = bundlesCount > pageSize;

  return (
    <>
      <ItemsCountWrapper>{bundlesCount || 0} items</ItemsCountWrapper>
      <BundlesWrapper>
        {bundles?.map &&
          bundles.map((bundle: Token) => (
            <BundleCard
              {...bundle}
              key={`bundle-${bundle.collection_id}-${bundle.token_id}`}
            />
          ))}
      </BundlesWrapper>
      {showButton && (
        <Button
          iconRight={{
            color: '#fff',
            name: 'arrow-right',
            size: 12,
          }}
          role="primary"
          title={'See all'}
          onClick={onClickSeeMore}
        />
      )}
    </>
  );
};

const ItemsCountWrapper = styled.div`
  margin: var(--gap) 0;
`;

const BundlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: calc(var(--gap) * 1.5);
  grid-row-gap: calc(var(--gap) * 1.5);
  margin-bottom: calc(var(--gap) * 1.5);

  @media (max-width: 1279px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 567px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 319px) {
    grid-template-columns: 1fr;
  }
`;

export default BundlesComponent;
