import { FC } from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';

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
    if (value) {
      navigate({
        pathname: `/${currentChain.network.toLowerCase()}/`,
        search: `?search=${value}`,
      });
    } else {
      setParamToQuery('search', '');
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

// const SearchWrapper = styled.div`
//   flex-grow: 1;
//   max-width: 614px;
//   margin-right: 40px;
//   > div > div {
//     width: auto;
//     flex-grow: 1;
//     margin-right: 0;
//   }
//   @media (max-width: ${DeviceSizes.md}) {
//     display: none;
//   }
// `;

export default GlobalSearch;
