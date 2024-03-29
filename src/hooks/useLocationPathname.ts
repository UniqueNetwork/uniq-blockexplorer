import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useLocationPathname = () => {
  const [notTheMainPage, setNotTheMainPage] = useState(false);
  const [tokensPage, setTokensPage] = useState(false);
  const [fractionalPage, setFractionalPage] = useState(false);
  const [tokenDetailPage, setTokenDetailPage] = useState(false);
  const [bundlesPage, setBundlesPage] = useState(false);
  const [collectionsPage, setCollectionsPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.match(
        `/(collections|tokens|account|extrinsic|block|nfts|fractional|bundles)`,
      )
    ) {
      setNotTheMainPage(true);
    } else {
      setNotTheMainPage(false);
    }

    if (location.pathname.match(`/(tokens/[0-9])`)) {
      setTokenDetailPage(true);
    } else {
      setTokenDetailPage(false);
    }

    if (location.pathname.match(`/(tokens)`)) {
      setTokensPage(true);
    } else {
      setTokensPage(false);
    }

    if (location.pathname.match(`/(fractional)`)) {
      setFractionalPage(true);
    } else {
      setFractionalPage(false);
    }

    if (
      location.pathname.match(`/(collections)`) &&
      !location.pathname.match(`/(collections/[0-9])`)
    ) {
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

  return {
    collectionsPage,
    notTheMainPage,
    tokensPage,
    bundlesPage,
    fractionalPage,
    tokenDetailPage,
  };
};
