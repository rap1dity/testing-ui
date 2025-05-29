import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

Before(async function () {
  this.browser = await chromium.launch({ headless: true, slowMo: 100 });
  this.context = await this.browser.newContext({ baseURL: 'https://demoqa.com' });
  this.page = await this.context.newPage();
});

After(async function () {
  await this.browser?.close();
});
