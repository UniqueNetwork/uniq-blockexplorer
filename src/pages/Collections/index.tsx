import { FC, useState } from 'react';
import styled from 'styled-components';

import { PagePaperWrapper } from '@app/components';
import { DeviceSizes } from '@app/hooks';

import CollectionsComponent from './components/CollectionsComponent';

const CollectionsPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="collections-page">
      <TopBar>
        <Title>Collections</Title>
      </TopBar>
      <PagePaperWrapper>
        <CollectionsComponent currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </PagePaperWrapper>
    </div>
  );
};

const TopBar = styled.div`
  display: grid;
  grid-column-gap: calc(var(--gap) * 2);
  grid-template-columns: 1fr 560px 72px;
  margin-bottom: calc(var(--gap) * 2.5);

  .unique-select .select-wrapper > svg {
    z-index: unset;
  }

  @media (max-width: ${DeviceSizes.sm}) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
`;

export default CollectionsPage;
