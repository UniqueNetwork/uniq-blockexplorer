import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useLocationPathname = () => {
  const [notTheMainPage, setNotTheMainPage] = useState(false);
  const [tokensPage, setTokensPage] = useState(false);
  const [bundlesPage, setBundlesPage] = useState(false);
  // const [bundlePage, setBundlePage] = useState(false);
  const [collectionsPage, setCollectionsPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.match(
        `/(collections|tokens|account|extrinsic|block|nfts|bundles)`,
      )
    ) {
      setNotTheMainPage(true);
    } else {
      setNotTheMainPage(false);
    }

    if (location.pathname.match(`/(tokens)`)) {
      setTokensPage(true);
    } else {
      setTokensPage(false);
    }

    if (location.pathname.match(`/(collections)`)) {
      setCollectionsPage(true);
    } else {
      setCollectionsPage(false);
    }

    if (location.pathname.match(`/(bundles)`)) {
      setBundlesPage(true);
    } else {
      setBundlesPage(false);
    }
  }, [location.pathname]);

  return { collectionsPage, notTheMainPage, tokensPage, bundlesPage };
};
