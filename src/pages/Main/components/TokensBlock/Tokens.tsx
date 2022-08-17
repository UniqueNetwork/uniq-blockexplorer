import { useCallback, useMemo, useState, VFC } from 'react';
import styled from 'styled-components';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, SelectOptionProps, Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, deviceWidth, useApi, useDeviceSize } from '@app/hooks';
import { PagePaperWrapper, TokenCard } from '@app/components';
import { logUserEvents } from '@app/utils/logUserEvents';
import { UserEvents } from '@app/analytics/user_analytics';
import { TokenSorting, useGraphQlTokens } from '@app/api/graphQL';

import { HeaderWithDropdown } from '../HeaderWithDropdown';
import { tokensOptions } from './tokensOptions';

interface TokensProps {
  searchString?: string;
  collectionId?: number;
}

export const Tokens: VFC<TokensProps> = ({ collectionId, searchString }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState<SelectOptionProps>(tokensOptions[0]);

  const deviceSize = useDeviceSize();

  const tokensLimit = useMemo(() => {
    if (deviceSize === DeviceSize.xxl) return 12;

    if (deviceSize === DeviceSize.lg || deviceSize === DeviceSize.xl) return 8;

    return 6;
  }, [deviceSize]);

  const onClick = useCallback(() => {
    const linkUrl = `/${currentChain.network}/tokens`;
    const navigateTo: { pathname: string; search?: string } = { pathname: linkUrl };

    if (searchString) {
      const searchParams = `?${createSearchParams([['search', `${searchString}`]])}`;

      navigateTo.search = searchParams;
    }

    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_NFTS_ON_MAIN_PAGE);
    navigate(navigateTo);
  }, [currentChain, navigate, searchString]);

  const filter = collectionId
    ? { collection_id: { _eq: Number(collectionId) } }
    : undefined;

  const orderBy = useMemo(
    (): TokenSorting =>
      selectedSort.id === 'new'
        ? { date_of_creation: 'desc' }
        : { transfers_count: 'desc' },
    [selectedSort.id],
  );

  const { isTokensFetching, timestamp, tokens } = useGraphQlTokens({
    filter,
    offset: 0,
    orderBy,
    pageSize: tokensLimit,
    searchString,
  });

  if (isTokensFetching) {
    return (
      <SkeletonWrapper>
        <Skeleton />
      </SkeletonWrapper>
    );
  }

  if (!tokens) {
    return null;
  }

  return (
    <Wrapper>
      <HeaderWithDropdown
        options={tokensOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        title="Tokens"
      />
      <TokensWrapper>
        {tokens?.slice(0, tokensLimit).map((token) => (
          <TokenCard
            key={`token-${token.collection_id}-${token.token_id}`}
            {...token}
            timeNow={timestamp}
          />
        ))}
      </TokensWrapper>
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
    </Wrapper>
  );
};

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
