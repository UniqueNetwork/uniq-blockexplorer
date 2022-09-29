import './app.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Notifications } from '@unique-nft/ui-kit';
import amplitude from 'amplitude-js';

import { Toolbar } from '@app/components/Toolbar';
import ToolbarContextWrapper from '@app/toolbarContext/toolbarContextWrapper';

import PageLayout from './components/PageLayout';
// contains gql and rpc with contexts and providers
import ApiWrapper from './api/ApiWrapper';

// exclude analytics for development mode
if (process.env.NODE_ENV !== 'development') {
  amplitude
    .getInstance()
    .init(
      window.ENV?.AMPLITUDE_ANALYTICS_API_KEY ||
        process.env.AMPLITUDE_ANALYTICS_API_KEY ||
        '',
    );
}

export default function App() {
  return (
    <div className="app-wrapper">
      <Notifications closingDelay={5000}>
        <ApiWrapper>
          <ToolbarContextWrapper>
            <PageLayout>
              <Outlet />
            </PageLayout>
            <Toolbar />
          </ToolbarContextWrapper>
        </ApiWrapper>
      </Notifications>
    </div>
  );
}
