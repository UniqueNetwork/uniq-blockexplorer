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
            index={true}
          />
          <Route path={':chainId/'}>
            <Route
              element={<Main />}
              index={true}
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
              element={<Collections />}
              path={'collections'}
            >
              <Route
                element={<Collection />}
                path={':collectionId'}
              />
            </Route>
            <Route
              element={<Tokens />}
              path={'tokens'}
            >
              <Route
                element={<Token />}
                path={':tokenId'}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
