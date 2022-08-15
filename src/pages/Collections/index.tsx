import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import CollectionsComponent from './components/CollectionsComponent';
import SearchComponent from '../../components/SearchComponent';
import PagePaper from '../../components/PagePaper';

const CollectionsPage: FC = () => {
  const [queryParams, setQueryParams] = useSearchParams();

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
        placeholder={'Сollection / account'}
        onSearchChange={onSearchChange}
      />
      <div>
        <CollectionsComponent />
      </div>
    </PagePaper>
  );
};

export default CollectionsPage;
