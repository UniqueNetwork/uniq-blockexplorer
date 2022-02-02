import React, { FC, useState } from 'react';

import TokensComponent from './components/TokensComponent';
import SearchComponent from '../../components/SearchComponent';

const TokensPage: FC = () => {
  const [searchString, setSearchString] = useState<string | undefined>();

  return (<>
    <SearchComponent
      onSearchChange={setSearchString}
      placeholder={'NFT / collection / account'}
    />
    <div>
      <TokensComponent
        searchString={searchString}
      />
    </div>
  </>);
};

export default TokensPage;
