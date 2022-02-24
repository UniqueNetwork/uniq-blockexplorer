import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Account, Block, Collections, Collection, Extrinsic, Main, Tokens, Token } from './pages';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          element={<App />}
          path={'/'}
        >
          <Route
            element={<Main />}
            index
          />
          <Route path={':chainId/'}>
            <Route
              element={<Main />}
              index
            />
            <Route
              element={<Block />}
              path={'block/:blockIndex'}
            />
            <Route
              element={<Account />}
              path={'account/:accountId'}
            />
            <Route
              element={<Extrinsic />}
              path={'extrinsic/:blockIndex'}
            />
            <Route
              element={<Block />}
              path={'block/:blockIndex'}
            />
            <Route
              path={'collections/'}
            >
              <Route
                element={<Collections />}
                index
              />
              <Route
                element={<Collection />}
                path={':collectionId'}
              />
            </Route>
            <Route
              path={'tokens/'}
            >
              <Route
                element={<Tokens />}
                index
              />
              <Route
                element={<Tokens />}
                path={':collectionId'}
              />
              <Route
                element={<Token />}
                path={':collectionId/:tokenId'}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
