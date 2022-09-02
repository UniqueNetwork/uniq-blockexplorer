import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3005',
    supportFile: false,
    viewportWidth: 1920,
    viewportHeight: 937,
    video: false,
  },
  env: {
    APP_ROOT_ID: 'root',
    NET_DEV_API: 'https://scan-api.dev.uniquenetwork.dev/v1/graphql',
    NET_UNIQUE_API: 'https://scan-api.unique.uniquenetwork.dev/v1/graphql',
    NET_QUARTZ_API: 'https://scan-api.quartz.uniquenetwork.dev/v1/graphql',
    NET_OPAL_API: 'https://scan-api.opal.uniquenetwork.dev/v1/graphql',
    OPAL_BASE_URL: '/OPAL/',
    QUARTS_BASE_URL: '/QUARTS/',
    UNIQUE_BASE_URL: '/UNIQUE/',
  },
});
