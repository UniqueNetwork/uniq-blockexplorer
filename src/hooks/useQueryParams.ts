import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ViewType } from '@app/components';

export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const [searchString, setSearchString] = useState<string | undefined>(
    queryParams.get('search') || '',
  );
  const [accountId, setAccountId] = useState<string | undefined>(
    queryParams.get('accountId') || '',
  );
  const [collectionId, setCollectionId] = useState<string | undefined>(
    queryParams.get('collectionId') || '',
  );
  const [sort, setSort] = useState<string | undefined>(queryParams.get('sort') || '');
  const [view, setView] = useState<string | undefined>(
    queryParams.get('view') || ViewType.List,
  );
  const [nesting, setNesting] = useState<string | undefined>(
    queryParams.get('nesting') || 'false',
  );

  const setFunction = (param: string) => {
    switch (param) {
      case 'search':
        return setSearchString;
      case 'accountId':
        return setAccountId;
      case 'collectionId':
        return setCollectionId;
      case 'sort':
        return setSort;
      case 'view':
        return setView;
      case 'nesting':
        return setNesting;
      default:
        return () => {
          console.log(`param ${param} does not exist`);
        };
    }
  };

  // for (const [key, value] of queryParams.entries()) {
  //   console.log(`${key}, ${value}`);
  // }

  // const serializeFromQuery = () => {
  //   const arrayParams = queryParams.toString().split('&');
  //   let params = {} as any;
  //   arrayParams.forEach((param) => {
  //     const a = param.split('=');
  //     params[a[0]] = a[1];
  //   });
  //   return params;
  // };

  // const params = serializeFromQuery();
  // console.log('params', params);

  const setParamToQuery = (param: string, value?: string | ViewType) => {
    setFunction(param)(value);

    if (value) {
      queryParams.set(`${param}`, value);
    } else {
      queryParams.delete(`${param}`);
    }

    setQueryParams(queryParams);
  };

  useEffect(() => {
    if (queryParams.get('search')) {
      setSearchString(decodeURI(queryParams.get('search') as string));
    } else setSearchString('');

    if (queryParams.get('accountId')) {
      setAccountId(queryParams.get('accountId') as string);
    }

    if (queryParams.get('collectionId')) {
      setCollectionId(queryParams.get('collectionId') as string);
    }

    if (queryParams.get('sort')) {
      setSort(queryParams.get('sort') as string);
    }

    if (queryParams.get('nesting')) {
      setNesting(queryParams.get('nesting') as string);
    } else {
      setNesting('false');
    }

    if (queryParams.get('view')) {
      setView(queryParams.get('view') as string);
    }
  }, [queryParams]);

  return {
    accountId,
    collectionId,
    nesting,
    searchString,
    sort,
    view,
    setParamToQuery,
  };
};
