import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { PagePaperWrapper } from '@app/components';
import { useSearchFromQuery } from '@app/hooks';

import CollectionsComponent from './components/CollectionsComponent';
import SearchComponent from '../../components/SearchComponent';

const CollectionsPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchFromQuery = useSearchFromQuery();
  const [searchString, setSearchString] = useState<string | undefined>(searchFromQuery);

  useEffect(() => {
    setSearchString(searchFromQuery);
  }, [searchFromQuery]);

  const onSearchChange = (value: string) => {
    setSearchString(value);
    setCurrentPage(1);
  };

  return (
    <PagePaper>
      <SearchComponent
        placeholder="Collection / account"
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
