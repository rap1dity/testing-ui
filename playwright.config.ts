import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://demoqa.com',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  retries: 1,
  reporter: [['html', { open: 'never' }]],
  projects: [
    {
      name: 'chromium-1080p',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox-768p',
      use: {
        browserName: 'firefox',
        viewport: { width: 1366, height: 768 },
      },
    },
  ],
});
