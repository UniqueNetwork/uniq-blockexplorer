import React, { FC, useState } from 'react';
import CollectionsComponent from './components/CollectionsComponent';
import SearchComponent from '../../components/SearchComponent';
import PagePaper from '../../components/PagePaper';

const CollectionsPage: FC = () => {
  const [searchString, setSearchString] = useState<string | undefined>();

  return (<PagePaper>
    <SearchComponent
      onSearchChange={setSearchString}
      placeholder={'Extrinsic / collection / account'}
    />
    <div>
      <CollectionsComponent
        searchString={searchString}
      />
    </div>
  </PagePaper>);
};

export default CollectionsPage;
