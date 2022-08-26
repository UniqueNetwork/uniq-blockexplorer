import { Heading, Tabs } from '@unique-nft/ui-kit';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { useGraphQlCollection } from '@app/api';
import { useCheckImageExists } from '@app/hooks';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';
import { IdentityIcon } from '@app/components';

import CollectionBasicDataComponent from './components/CollectionBasicDataComponent';
import CollectionExtendedDataComponent from './components/CollectionExtendedDataComponent';
import HoldersComponent from './components/HoldersComponent';
import PagePaper from '../../components/PagePaper';

const detailTabs = ['Basic data', 'Extended'];

const CollectionPage: FC = () => {
  const [activeDetailTabIndex, setActiveDetailTabIndex] = useState<number>(0);
  const { collectionId } = useParams<{ collectionId: string }>();
  const { collection } = useGraphQlCollection(Number(collectionId));
  const imgSrc = useCheckImageExists(
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
            <CoverContainer>
              {imgSrc ? (
                <img alt={`collection ${collectionId ?? ''} cover`} src={imgSrc} />
              ) : (
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
          activeIndex={activeDetailTabIndex}
          labels={detailTabs}
          onClick={setActiveDetailTabIndex}
        />
        <Tabs activeIndex={activeDetailTabIndex}>
          <CollectionBasicDataComponent
            collection={collection}
            collectionId={collectionId || ''}
            key="collections"
          />
          <CollectionExtendedDataComponent collection={collection} key="tokens" />
        </Tabs>
      </PagePaper>
      {activeDetailTabIndex === 0 && (
        <PagePaper>
          <div>
            <Heading size={'2'}>Holders</Heading>
            <HoldersComponent collectionId={collectionId} key={'holder'} />
          </div>
        </PagePaper>
      )}
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

const CoverContainer = styled.div`
  background-color: white;
  border: 2px solid white;
  box-sizing: border-box;
  border-radius: 48px;
  height: 88px;
  width: 88px;
  top: calc(100% - 46px);
  left: calc(50% - 46px);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  svg {
    width: 88px;
    height: 88px;

    @media (max-width: 767px) {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 767px) {
    width: 64px;
    height: 64px;
    top: calc(100% - 32px);
    left: calc(50% - 32px);
  }
`;

export default CollectionPage;
