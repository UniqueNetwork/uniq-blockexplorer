import { FC, useCallback } from 'react';
import styled from 'styled-components/macro';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@unique-nft/ui-kit';

import { Token, useGraphQlTokens } from '@app/api';
import { Search, TokenCard } from '@app/components';
import { useApi, useQueryParams } from '@app/hooks';
import { normalizeSubstrate } from '@app/utils/normalizeAccount';
import { getMirrorFromEthersToSubstrate } from '@app/utils';
import { defaultSorting } from '@app/pages/Tokens/constants';

interface TokensComponentProps {
  accountId: string;
  pageSize?: number;
}

const TokensComponent: FC<TokensComponentProps> = ({ accountId, pageSize = 12 }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const { searchString, setParamToQuery } = useQueryParams();
  const [queryParams, setQueryParams] = useSearchParams();
  // assume that we got the substrate address
  let substrateAddress = accountId;

  // if we get an ether address
  if (/0x[0-9A-Fa-f]{40}/g.test(accountId)) {
    const substrateMirror = getMirrorFromEthersToSubstrate(
      accountId,
      currentChain.network,
    );

    substrateAddress = substrateMirror;
  }

  const { tokens, tokensCount } = useGraphQlTokens({
    filter: {
      _or: [
        { owner: { _eq: accountId } },
        { owner_normalized: { _eq: normalizeSubstrate(substrateAddress) } },
      ],
    },
    offset: 0,
    pageSize,
    searchString,
  });
  const showButton = tokensCount > pageSize;

  const setSearch = (value: string) => {
    setParamToQuery('search', value);
  };

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
      pathname: `/${currentChain.network.toLowerCase()}/tokens/nfts/`,
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

  return (
    <>
      <ControlsWrapper>
        <Search placeholder="NFT / collection" onSearchChange={setSearch} />
      </ControlsWrapper>
      <ItemsCountWrapper>{tokensCount || 0} items</ItemsCountWrapper>
      <TokensWrapper>
        {tokens?.map &&
          tokens.map((token: Token) => (
            <TokenCard
              {...token}
              key={`token-${token.collection_id}-${token.token_id}`}
            />
          ))}
      </TokensWrapper>
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

const ControlsWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;
  margin-top: var(--gap);
`;

const ItemsCountWrapper = styled.div`
  margin: var(--gap) 0;
`;

const TokensWrapper = styled.div`
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

export default TokensComponent;
