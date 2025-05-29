import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://demoqa.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: process.env.HEADLESS === 'true',
  },
  workers: process.env.CI === 'true' ? 4 : undefined,
  retries: 1,
  reporter: [['html', { open: 'never' }]],
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1366, height: 768 },
      },
    },
  ],
});
