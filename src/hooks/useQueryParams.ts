import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ViewType } from '@app/components';
import { lastTransferOptions } from '@app/pages/Main/components/LastTransfers/lastTransferOptions';

export type TParam = {
  name: string;
  value?: string | ViewType;
};

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

  const [mainTokensSort, setMainTokensSort] = useState<string | undefined>(
    queryParams.get('mainTokensSort') || 'new',
  );

  const [mainBundlesSort, setMainBundlesSort] = useState<string | undefined>(
    queryParams.get('mainBundlesSort') || 'new',
  );

  const [mainLastTransfersSort, setMainLastTransfersSort] = useState<string | undefined>(
    queryParams.get('mainLastTransfersSort') || (lastTransferOptions[1].id as string),
  );

  const [mainCollectionsSort, setMainCollectionsSort] = useState<string | undefined>(
    queryParams.get('mainCollectionsSort') || 'new',
  );

  const [attributes, setAttributes] = useState<string | undefined>(
    queryParams.get('attributes') || '',
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
      case 'mainTokensSort':
        return setMainTokensSort;
      case 'mainBundlesSort':
        return setMainBundlesSort;
      case 'mainLastTransfersSort':
        return setMainLastTransfersSort;
      case 'mainCollectionsSort':
        return setMainCollectionsSort;
      case 'attributes':
        return setAttributes;
      default:
        return () => {
          console.log(`param ${param} does not exist`);
        };
    }
  };

  const setParamToQuery = (param: [TParam]) => {
    param.forEach((param) => {
      const { name, value } = param;
      setFunction(name)(value);

      if (value) {
        queryParams.set(`${name}`, value);
      } else {
        queryParams.delete(`${name}`);
      }
    });
    setQueryParams(queryParams);
  };

  useEffect(() => {
    if (queryParams.get('search')) {
      setSearchString(queryParams.get('search') as string);
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
    } else {
      setView('List');
    }

    if (queryParams.get('mainTokensSort')) {
      setMainTokensSort(queryParams.get('mainTokensSort') as string);
    } else {
      setMainTokensSort('new');
    }

    if (queryParams.get('mainBundlesSort')) {
      setMainBundlesSort(queryParams.get('mainBundlesSort') as string);
    } else {
      setMainBundlesSort('new');
    }

    if (queryParams.get('mainLastTransfersSort')) {
      setMainLastTransfersSort(queryParams.get('mainLastTransfersSort') as string);
    } else {
      setMainLastTransfersSort(lastTransferOptions[1].id as string);
    }

    if (queryParams.get('mainCollectionsSort')) {
      setMainCollectionsSort(queryParams.get('mainCollectionsSort') as string);
    } else {
      setMainCollectionsSort('new');
    }

    if (queryParams.get('attributes')) {
      setAttributes(queryParams.get('attributes') as string);
    } else {
      setAttributes('');
    }
  }, [queryParams]);

  return {
    accountId,
    collectionId,
    nesting,
    searchString,
    sort,
    view,
    mainTokensSort,
    mainBundlesSort,
    mainLastTransfersSort,
    mainCollectionsSort,
    setParamToQuery,
    attributes,
  };
};
