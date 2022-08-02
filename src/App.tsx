import './app.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Notifications } from '@unique-nft/ui-kit';

import PageLayout from './components/PageLayout';
// contains gql and rpc with contexts and providers
import ApiWrapper from './api/ApiWrapper';
import amplitude from 'amplitude-js';

// exclude analytics for development mode
if (process.env.NODE_ENV !== 'development') {
  amplitude.getInstance().init(window.ENV?.AMPLITUDE_ANALYTICS_API_KEY || process.env.AMPLITUDE_ANALYTICS_API_KEY || '');
}

export default function App() {
  return (
    <div className='app-wrapper'>
      <Notifications closingDelay={5000}>
        <ApiWrapper>
          <PageLayout>
            <Outlet />
          </PageLayout>
        </ApiWrapper>
      </Notifications>
    </div>
  );
}
