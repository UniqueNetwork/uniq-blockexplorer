import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { PagePaperWrapper } from '@app/components';

import CollectionsComponent from './components/CollectionsComponent';
import SearchComponent from '../../components/SearchComponent';

const CollectionsPage: FC = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const searchString = queryParams.get('search') || '';

  const onSearchChange = (value: string) => {
    if (!value) {
      queryParams.delete('search');
    } else {
      queryParams.set('search', value);
    }

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
        <CollectionsComponent />
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
