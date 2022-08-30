import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { PagePaperWrapper } from '@app/components';

import CollectionsComponent from './components/CollectionsComponent';
import SearchComponent from '../../components/SearchComponent';

const CollectionsPage: FC = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchString = queryParams.get('search') || '';

  const onSearchChange = (value: string) => {
    if (!value) {
      queryParams.delete('search');
    } else {
      queryParams.set('search', value);
    }

    setCurrentPage(1);
    setQueryParams(queryParams);
  };

  return (
    <PagePaper>
      <SearchComponent
        placeholder="Collection / account"
        value={searchString}
        onSearchChange={onSearchChange}
      />
      <div>
        <CollectionsComponent currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </PagePaper>
  );
};

const PagePaper = styled(PagePaperWrapper)`
  > div:first-of-type {
    margin-bottom: calc(var(--gap) * 3);
  }
`;

export default CollectionsPage;
