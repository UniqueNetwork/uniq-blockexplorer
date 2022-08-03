import { FC } from 'react';
import CollectionsComponent from './components/CollectionsComponent';
import SearchComponent from '../../components/SearchComponent';
import PagePaper from '../../components/PagePaper';
import { useSearchParams } from 'react-router-dom';

const CollectionsPage: FC = () => {
  const [queryParams, setQueryParams] = useSearchParams();


  const onSearchChange = (value: string)=>{
    if (!value) {
      queryParams.delete('search');
    } else {
      queryParams.set('search', value);
    }

    setQueryParams(queryParams);
  };

  return (<PagePaper>
    <SearchComponent
      onSearchChange={onSearchChange}
      placeholder={'Сollection / account'}
    />
    <div>
      <CollectionsComponent />
    </div>
  </PagePaper>);
};

export default CollectionsPage;
