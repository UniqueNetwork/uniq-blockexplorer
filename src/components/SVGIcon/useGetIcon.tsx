import { useEffect, useState } from 'react';

export const useGetIcon = (path: string) => {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const isExternalLink = (url: string) => {
      const tmp = document.createElement('a');
      tmp.href = url;
      return tmp.host !== window.location.host;
    };
    // For safety reasons, only internal paths are allowed
    if (!isExternalLink(path)) {
      fetch(path)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          setIcon(data);
        });
    } else {
      throw new Error('You need to specify the internal path for icons');
    }
  }, [path]);

  return icon;
};
