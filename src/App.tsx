import './app.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from './components/PageLayout';
// contains gql and rpc with contexts and providers
import ApiWrapper from './api/ApiWrapper';
import amplitude from 'amplitude-js';

amplitude.getInstance().init('1c3113523c9c5881e9fa4572fa5df89c');

export default function App() {
  return (
    <div className={'app-wrapper'}>
      <ApiWrapper>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </ApiWrapper>
    </div>
  );
}
