import { Heading } from '@unique-nft/ui-kit';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { TokenTypeEnum, useGraphQlCollection } from '@app/api';
import { deviceWidth, useCheckImageExists, useScrollToTop } from '@app/hooks';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';
import { Badge, IdentityIcon, Tabs } from '@app/components';
import { useGraphQLRftHolders } from '@app/api/graphQL/rftHolders/rftHolders';

import CollectionBasicDataComponent from './components/CollectionBasicDataComponent';
import CollectionExtendedDataComponent from './components/CollectionExtendedDataComponent';
import TokensComponent from './components/TokensComponent/index';
import PagePaper from '../../components/PagePaper';
import { CoverContainer } from './components/CoverContainer';
import CollectionStatisticBlock from './components/CollectionStatisticBlock';

const detailTabs = ['Basic data', 'Extended'];

const CollectionPage: FC = () => {
  useScrollToTop();
  const [activeDetailTabIndex, setActiveDetailTabIndex] = useState<number>(0);
  const { collectionId } = useParams<{ collectionId: string }>();
  const { collection, isCollectionFetching } = useGraphQlCollection(Number(collectionId));
  const { imgSrc } = useCheckImageExists(
    getCoverURLFromCollection(collection?.collection_cover),
  );

  const { isTokenHoldersFetching, owners } = useGraphQLRftHolders({
    limit: 2_147_483_647,
    collectionId: Number(collectionId),
  });

  // user analytics
  useEffect(() => {
    if (activeDetailTabIndex === 1) {
      logUserEvents(UserEvents.Click.TAB_EXTENDED_ON_COLLECTION_PAGE);
    }
  }, [activeDetailTabIndex]);

  const collectionData = useMemo(() => {
    if (!collection) return undefined;

    if (collection?.mode === 'RFT') {
      const holders_count = new Set(owners?.map(({ owner }) => owner)).size;
      return {
        ...collection,
        holders_count,
      };
    }

    return collection;
  }, [collection, owners]);

  return (
    <>
      <PagePaper>
        <CollectionTitle>
          {collectionId && (
            <CoverContainer src={imgSrc}>
              {!imgSrc && (
                <IdentityIcon
                  address={`collection ${collectionId ?? ''} cover`}
                  size="84"
                />
              )}
            </CoverContainer>
          )}
          <Heading size="2">{collection?.name || ''}</Heading>
          {collection?.mode === TokenTypeEnum.RFT && (
            <BadgeStyled
              id="collection-fractional"
              tooltipDescription={
                <>
                  A&nbsp;fractional token provides a&nbsp;way for many users to&nbsp;own
                  a&nbsp;part of&nbsp;an&nbsp;NFT
                </>
              }
            >
              Fractional
            </BadgeStyled>
          )}
        </CollectionTitle>
        <Tabs
          content={detailTabs}
          currentTabIndex={activeDetailTabIndex}
          setCurrentTabIndex={setActiveDetailTabIndex}
        />
        {activeDetailTabIndex === 0 && (
          <CollectionBasicDataComponent collection={collectionData} key="collections" />
        )}
        {activeDetailTabIndex === 1 && (
          <CollectionExtendedDataComponent collection={collection} key="tokens" />
        )}
      </PagePaper>
      <PagePaper>
        <div>
          <TokensComponent
            collectionId={collectionId}
            isLoading={isCollectionFetching || isTokenHoldersFetching}
            mode={collection?.mode}
          />
        </div>
      </PagePaper>
      <CollectionStatisticBlock collectionId={collectionId} mode={collection?.mode} />
    </>
  );
};

const CollectionTitle = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);
  margin-bottom: calc(var(--gap) * 2);
  position: relative;

  h2 {
    margin-bottom: 0 !important;
    word-break: break-word;
  }
  @media ${deviceWidth.smallerThan.md} {
    padding-bottom: 50px;
  }
`;

const BadgeStyled = styled(Badge)`
  top: 0;
  right: 0;
  background-color: var(--color-secondary-400);
  color: var(--color-additional-light);
  @media ${deviceWidth.smallerThan.md} {
    left: 0;
    bottom: 0;
    top: unset;
    right: unset;
  }
`;

export default CollectionPage;
