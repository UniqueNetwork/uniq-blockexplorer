import { FC } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { useApi, useQueryParams } from '@app/hooks';
import { Search } from '@app/components';

interface GlobalSearchProps {
  searchRef?: React.RefObject<HTMLInputElement>;
}

const GlobalSearch: FC<GlobalSearchProps> = ({ searchRef }) => {
  const { currentChain } = useApi();

  const navigate = useNavigate();
  const { setParamToQuery } = useQueryParams();

  const onGlobalSearch = (value: string) => {
    const param = { search: '' };
    param.search = value;

    if (value) {
      navigate({
        pathname: `/${currentChain.network.toLowerCase()}/`,
        search: `?${createSearchParams(param)}`,
      });
    } else {
      setParamToQuery([{ name: 'search', value: '' }]);
    }
  };

  return (
    <Search
      hideSearchButton
      placeholder="Global search"
      searchRef={searchRef}
      onSearchChange={onGlobalSearch}
    />
  );
};

export default GlobalSearch;
