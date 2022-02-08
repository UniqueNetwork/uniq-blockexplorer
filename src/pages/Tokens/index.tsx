import React, { FC, useState } from 'react';

import TokensComponent from './components/TokensComponent';
import SearchComponent from '../../components/SearchComponent';
import PagePaper from '../../components/PagePaper';

const TokensPage: FC = () => {
  const [searchString, setSearchString] = useState<string | undefined>();

  return (<PagePaper>
    <SearchComponent
      onSearchChange={setSearchString}
      placeholder={'Extrinsic / collection / NFT / account'}
    />
    <div>
      <TokensComponent
        searchString={searchString}
      />
    </div>
  </PagePaper>);
};

export default TokensPage;
