import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Account, Block, Collections, Extrinsic, Main } from './pages';
import Collection from './pages/Collection';

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
            />
            <Route
              element={<Collection />}
              path={'collections/:collectionId'}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
