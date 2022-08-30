import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { PagePaperWrapper } from '@app/components';

import CollectionsComponent from './components/CollectionsComponent';
import SearchComponent from '../../components/SearchComponent';

const CollectionsPage: FC = () => {
  const [queryParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchString, setSearchString] = useState<string | undefined>(
    queryParams.get('search') || '',
  );

  useEffect(() => {
    if (queryParams.get('search')) {
      setSearchString(decodeURI(queryParams.get('search') as string));
    } else setSearchString('');
  }, [queryParams]);

  const onSearchChange = (value: string) => {
    setSearchString(value);
    setCurrentPage(1);
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
