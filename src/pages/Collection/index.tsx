import { Heading, Tabs } from '@unique-nft/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { useGraphQlCollection } from '@app/api';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';

import Avatar from '../../components/Avatar';
import CollectionBasicDataComponent from './components/CollectionBasicDataComponent';
import CollectionExtendedDataComponent from './components/CollectionExtendedDataComponent';
import HoldersComponent from './components/HoldersComponent';
import PagePaper from '../../components/PagePaper';

const detailTabs = ['Basic data', 'Extended'];

const CollectionPage: FC = () => {
  const [activeDetailTabIndex, setActiveDetailTabIndex] = useState<number>(0);
  const { collectionId } = useParams<{ collectionId: string }>();
  const { collection } = useGraphQlCollection(Number(collectionId));

  // user analytics
  useEffect(() => {
    if (activeDetailTabIndex === 1) {
      logUserEvents(UserEvents.Click.TAB_EXTENDED_ON_COLLECTION_PAGE);
    }
  }, [activeDetailTabIndex]);

  return (<>
    <PagePaper>
      <CollectionTitle>
        <Avatar
          size={'large'}
          src={getCoverURLFromCollection(collection?.collection_cover)}
        />
        <Heading size={'2'}>{collection?.name || ''}</Heading>
      </CollectionTitle>
      <Tabs
        activeIndex={activeDetailTabIndex}
        labels={detailTabs}
        onClick={setActiveDetailTabIndex}
      />
      <Tabs
        activeIndex={activeDetailTabIndex}
      >
        <CollectionBasicDataComponent
          collection={collection}
          collectionId={collectionId || ''}
          key='collections'
        />
        <CollectionExtendedDataComponent
          collection={collection}
          key='tokens'
        />
      </Tabs>
    </PagePaper>
    {activeDetailTabIndex === 0 && <PagePaper>
      <HoldersWrapper>
        <Heading size={'2'}>Holders</Heading>
        <HoldersComponent
          collectionId={collectionId}
          key={'holder'}
        />
      </HoldersWrapper>
    </PagePaper>}
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

const HoldersWrapper = styled.div`
  
`;

export default CollectionPage;
