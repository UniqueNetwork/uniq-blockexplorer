import { useCallback, useEffect, useMemo, useState, VFC } from 'react';
import styled from 'styled-components/macro';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, deviceWidth, useApi, useDeviceSize } from '@app/hooks';
import { Header } from '@app/styles/styled-components';
import { PagePaperWrapper, DropdownOptionProps } from '@app/components';
import { logUserEvents } from '@app/utils/logUserEvents';
import { UserEvents } from '@app/analytics/user_analytics';
import { BundleSorting, useGraphQlBundles } from '@app/api/graphQL';
import { defaultSorting } from '@app/pages/Tokens/constants';
import BundleCard from '@app/components/BundleCard';

import { HeaderWithDropdown } from '../HeaderWithDropdown';
import { tokensOptions } from '../TokensBlock/tokensOptions';

interface BundlesProps {
  searchModeOn: boolean;
  searchString?: string;
  setResultExist?: (val: boolean) => void;
}

export const Bundles: VFC<BundlesProps> = ({
  searchString,
  searchModeOn,
  setResultExist,
}) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState<DropdownOptionProps>(tokensOptions[0]);

  const deviceSize = useDeviceSize();

  const bundlesLimit = useMemo(() => {
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
      pathname: `/${currentChain.network.toLowerCase()}/bundles/`,
      search: `?${createSearchParams(params)}`,
    });
  }, [currentChain, navigate, searchString]);

  const filter = { _or: [{}], burned: { _eq: 'false' } };

  const orderBy = useMemo(
    (): BundleSorting =>
      selectedSort.id === 'new'
        ? { date_of_creation: 'desc_nulls_last' }
        : { transfers_count: 'desc_nulls_last' },
    [selectedSort.id],
  );

  const { isBundlesFetching, timestamp, bundles, bundlesCount } = useGraphQlBundles({
    filter,
    offset: 0,
    orderBy,
    pageSize: bundlesLimit,
    searchString,
  });
  const [showButton, setShowButton] = useState<boolean>(true);

  useEffect(() => {
    if (bundlesCount > bundlesLimit) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [bundlesCount, bundlesLimit, setShowButton]);

  useEffect(() => {
    if (searchModeOn && !isBundlesFetching && setResultExist) {
      setResultExist(!!bundles?.length);
    }
  }, [bundles, isBundlesFetching, searchModeOn, setResultExist]);

  if (isBundlesFetching) {
    return (
      <SkeletonWrapper>
        <Skeleton />
      </SkeletonWrapper>
    );
  }

  if (!bundles?.length) {
    return null;
  }

  return (
    <Wrapper data-automation-id="bundles">
      {searchModeOn ? (
        <StyledHeader size="2">Bundles</StyledHeader>
      ) : (
        <HeaderWithDropdown
          options={tokensOptions}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          title="Bundles"
        />
      )}
      <TokensWrapper>
        {bundles?.slice(0, bundlesLimit).map((token) => (
          <BundleCard
            key={`bundle-${token.collection_id}-${token.token_id}`}
            {...token}
            timeNow={timestamp}
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
