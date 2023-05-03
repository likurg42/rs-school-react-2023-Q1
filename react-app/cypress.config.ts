import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
  video: false,
  fixturesFolder: false,
  screenshotOnRunFailure: false,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});