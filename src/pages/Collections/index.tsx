import React, { FC, useState } from 'react';
import CollectionsComponent from './components/CollectionsComponent';
import SearchComponent from '../../components/SearchComponent';

const CollectionsPage: FC = () => {
  const [searchString, setSearchString] = useState<string | undefined>();

  return (<>
    <SearchComponent
      onSearchChange={setSearchString}
      placeholder={'Extrinsic / collection / account'}
    />
    <div>
      <CollectionsComponent
        searchString={searchString}
      />
    </div>
  </>);
};

export default CollectionsPage;
