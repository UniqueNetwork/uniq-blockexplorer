import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import {
  Account,
  Block,
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
          <Route index element={<Navigate to={`/${defaultChain.network}/`} />} />
          <Route path=":chainId">
            <Route index element={<Main />} />
            <Route element={<Block />} path="block/:blockIndex" />
            <Route element={<Account />} path="account/:accountId" />
            <Route element={<Extrinsic />} path="extrinsic/:blockIndex" />
            <Route element={<Block />} path="block/:blockIndex" />
            <Route path="collections">
              <Route index element={<Collections />} />
              <Route element={<Collection />} path=":collectionId" />
            </Route>
            <Route path="tokens">
              <Route index element={<Tokens />} />
              <Route element={<Tokens />} path="nfts" />
              <Route element={<Tokens />} path="fractional" />
              <Route element={<Tokens />} path=":collectionId" />
              <Route element={<Token />} path=":collectionId/:tokenId" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
