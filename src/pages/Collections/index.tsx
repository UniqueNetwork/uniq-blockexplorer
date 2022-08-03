import React, { FC, useState } from 'react';
import CollectionsComponent from './components/CollectionsComponent';
import SearchComponent from '../../components/SearchComponent';
import PagePaper from '../../components/PagePaper';
import { useSearchParams } from 'react-router-dom';

const CollectionsPage: FC = () => {
  const [queryParams] = useSearchParams();
  const searchParams = queryParams.get('search');
  const [searchString, setSearchString] = useState<string | undefined>(searchParams || '');

  return (<PagePaper>
    <SearchComponent
      onSearchChange={setSearchString}
      placeholder={'Сollection / account'}
    />
    <div>
      <CollectionsComponent
        searchString={searchString}
      />
    </div>
  </PagePaper>);
};

export default CollectionsPage;
