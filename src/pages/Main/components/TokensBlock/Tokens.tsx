import { useCallback, useEffect, useMemo, useState, VFC } from 'react';
import styled from 'styled-components/macro';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@unique-nft/ui-kit';

import {
  DeviceSize,
  deviceWidth,
  useApi,
  useDeviceSize,
  useQueryParams,
} from '@app/hooks';
import { Header } from '@app/styles/styled-components';
import { PagePaperWrapper, DropdownOptionProps, TokenCard } from '@app/components';
import { logUserEvents } from '@app/utils/logUserEvents';
import { UserEvents } from '@app/analytics/user_analytics';
import { TokenSorting, useGraphQlTokens } from '@app/api/graphQL';
import { defaultSorting } from '@app/pages/Tokens/constants';
import { useGraphQLTokensTotalHolders } from '@app/api/graphQL/rftTotalHolders/rftTotalHolders';

import { HeaderWithDropdown } from '../HeaderWithDropdown';
import { tokensOptions } from './tokensOptions';

interface TokensProps {
  searchModeOn: boolean;
  searchString?: string;
  collectionId?: number;
  setResultExist?: (val: boolean) => void;
}

export const Tokens: VFC<TokensProps> = ({
  collectionId,
  searchString,
  searchModeOn,
  setResultExist,
}) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const { setParamToQuery, mainTokensSort } = useQueryParams();
  const defaultSort = tokensOptions.find((option) => option.id === mainTokensSort);
  const [selectedSort, setSelectedSort] = useState<DropdownOptionProps>(
    defaultSort || tokensOptions[0],
  );

  const onOrderChange = (newOrder: DropdownOptionProps) => {
    setParamToQuery([
      {
        name: 'mainTokensSort',
        value: newOrder.id as string,
      },
    ]);
    setSelectedSort(newOrder);
  };

  const deviceSize = useDeviceSize();

  const tokensLimit = useMemo(() => {
    if (deviceSize === DeviceSize.xxl) return 12;

    if (deviceSize === DeviceSize.lg || deviceSize === DeviceSize.xl) return 8;

    return 6;
  }, [deviceSize]);

  const onClick = useCallback(() => {
    let params: { sort?: string; search?: string } = {};
    params.sort = defaultSorting;

    if (searchString) {
      params.search = searchString;
    }

    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_NFTS_ON_MAIN_PAGE);
    navigate({
      pathname: `/${currentChain.network.toLowerCase()}/tokens/nfts/`,
      search: `?${createSearchParams(params)}`,
    });
  }, [currentChain, navigate, searchString]);

  const filter = collectionId
    ? { collection_id: { _eq: Number(collectionId) }, burned: { _eq: 'false' } }
    : {
        burned: { _eq: 'false' },
      };

  const orderBy = useMemo(
    (): TokenSorting =>
      selectedSort.id === 'new'
        ? { date_of_creation: 'desc_nulls_last' }
        : { transfers_count: 'desc_nulls_last' },
    [selectedSort.id],
  );

  const { isTokensFetching, timestamp, tokens, tokensCount } = useGraphQlTokens({
    filter,
    offset: 0,
    orderBy,
    pageSize: tokensLimit,
    searchString,
  });

  const { tokensHolders, isTokensTotalHoldersFetching } = useGraphQLTokensTotalHolders({
    tokens:
      tokens?.map(({ collection_id, token_id }) => ({ collection_id, token_id })) || [],
  });

  const tokensWithOwners = useMemo(
    () =>
      tokens?.map((token) => ({
        ...token,
        ownersCount: tokensHolders[`${token.collection_id}_${token.token_id}`] || 0,
      })) || [],
    [tokens, tokensHolders],
  );

  const [showButton, setShowButton] = useState<boolean>(true);

  useEffect(() => {
    if (tokensCount > tokensLimit) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [tokensCount, tokensLimit, setShowButton]);

  useEffect(() => {
    if (searchModeOn && !isTokensFetching && setResultExist) {
      setResultExist(!!tokens?.length);
    }
  }, [tokens, isTokensFetching, searchModeOn, setResultExist]);

  if (isTokensFetching || isTokensTotalHoldersFetching) {
    return (
      <SkeletonWrapper>
        <Skeleton />
      </SkeletonWrapper>
    );
  }

  if (!tokens?.length) {
    return null;
  }

  return (
    <Wrapper data-automation-id="tokens">
      {searchModeOn ? (
        <StyledHeader size="2">Tokens</StyledHeader>
      ) : (
        <HeaderWithDropdown
          options={tokensOptions}
          selectedSort={selectedSort}
          setSelectedSort={onOrderChange}
          title="Tokens"
        />
      )}
      <TokensWrapper>
        {tokensWithOwners?.slice(0, tokensLimit).map((token) => (
          <TokenCard
            key={`token-${token.collection_id}-${token.token_id}`}
            {...token}
            timeNow={timestamp}
            hideOwner={true}
            hideTransfers={true}
          />
        ))}
      </TokensWrapper>
      {showButton && (
        <Button
          iconRight={{
            color: 'white',
            name: 'arrow-right',
            size: 10,
          }}
          role="primary"
          title="See all"
          onClick={onClick}
        />
      )}
    </Wrapper>
  );
};
const StyledHeader = styled(Header)`
  margin-bottom: 32px !important;
  @media ${deviceWidth.smallerThan.md} {
    font-size: 20px !important;
    line-height: 28px !important;
    font-weight: 700 !important;
  }
`;

const SkeletonWrapper = styled(PagePaperWrapper)`
  padding: 0;

  .unique-skeleton {
    width: 100%;
    border-radius: var(--gap) !important;

    &:after {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }
`;

const Wrapper = styled(PagePaperWrapper)`
  @media ${deviceWidth.smallerThan.md} {
    button.unique-button {
      width: 100%;
    }
  }
`;

const TokensWrapper = styled.div`
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
