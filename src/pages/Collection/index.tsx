import { Heading } from '@unique-nft/ui-kit';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { useGraphQlCollection } from '@app/api';
import { useCheckImageExists, useScrollToTop } from '@app/hooks';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';
import { IdentityIcon, Tabs } from '@app/components';

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
  const { collection } = useGraphQlCollection(Number(collectionId));
  const { imgSrc } = useCheckImageExists(
    getCoverURLFromCollection(collection?.collection_cover),
  );

  // user analytics
  useEffect(() => {
    if (activeDetailTabIndex === 1) {
      logUserEvents(UserEvents.Click.TAB_EXTENDED_ON_COLLECTION_PAGE);
    }
  }, [activeDetailTabIndex]);

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
        </CollectionTitle>
        <Tabs
          content={detailTabs}
          currentTabIndex={activeDetailTabIndex}
          setCurrentTabIndex={setActiveDetailTabIndex}
        />
        {activeDetailTabIndex === 0 && (
          <CollectionBasicDataComponent collection={collection} key="collections" />
        )}
        {activeDetailTabIndex === 1 && (
          <CollectionExtendedDataComponent collection={collection} key="tokens" />
        )}
      </PagePaper>
      <PagePaper>
        <div>
          <TokensComponent collectionId={collectionId} />
        </div>
      </PagePaper>
      <CollectionStatisticBlock collectionId={collectionId} />
    </>
  );
};

const CollectionTitle = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);
  margin-bottom: calc(var(--gap) * 2);

  h2 {
    margin-bottom: 0 !important;
    word-break: break-word;
  }
`;

export default CollectionPage;
