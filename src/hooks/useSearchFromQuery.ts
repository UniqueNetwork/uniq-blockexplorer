import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useSearchFromQuery = () => {
  const [queryParams] = useSearchParams();
  const [searchString, setSearchString] = useState<string | undefined>(
    queryParams.get('search') || '',
  );

  useEffect(() => {
    if (queryParams.get('search')) {
      setSearchString(decodeURI(queryParams.get('search') as string));
    } else setSearchString('');
  }, [queryParams]);

  return searchString;
};
