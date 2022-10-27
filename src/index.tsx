import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import {
  Account,
  Block,
  Bundles,
  Collections,
  Collection,
  Extrinsic,
  Main,
  Tokens,
  Token,
} from './pages';
import config from './config';

if (config.GTMExists) {
  TagManager.initialize({
    gtmId: 'GTM-MBJRM6M',
  });
}

const { defaultChain } = config;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<App />} path="/">
          <Route
            index
            element={<Navigate to={`/${defaultChain.network.toLowerCase()}/`} />}
          />
          <Route path=":chainId">
            <Route index element={<Main />} />
            <Route element={<Block />} path="block/:blockIndex" />
            <Route element={<Account />} path="account/:accountId" />
            <Route element={<Extrinsic />} path="extrinsic/:blockIndex" />
            <Route path="bundles">
              <Route index element={<Bundles />} />
              <Route element={<Collection />} path=":collectionId" />
            </Route>
            <Route path="collections">
              <Route index element={<Collections />} />
              <Route element={<Collection />} path=":collectionId" />
            </Route>
            <Route path="tokens/*" element={<Tokens />}>
              <Route path="fractional" />
              <Route path="nfts" />
            </Route>
            <Route path="nfts">
              <Route element={<Token />} path=":collectionId/:tokenId" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
