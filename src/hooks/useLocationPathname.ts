import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useLocationPathname = () => {
  const [notTheMainPage, setNotTheMainPage] = useState(false);
  const [tokensOrCollectionsPage, setTokensOrCollectionsPage] = useState(false);
  const [collectionsPage, setCollectionsPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.match(`/(collections|tokens|account|extrinsic|block)`)) {
      setNotTheMainPage(true);
    } else {
      setNotTheMainPage(false);
    }

    if (location.pathname.match(`/(collections|tokens)`)) {
      setTokensOrCollectionsPage(true);
    } else {
      setTokensOrCollectionsPage(false);
    }

    if (location.pathname.match(`/(collections)`)) {
      setCollectionsPage(true);
    } else {
      setCollectionsPage(false);
    }
  }, [location.pathname]);

  return { collectionsPage, notTheMainPage, tokensOrCollectionsPage };
};
