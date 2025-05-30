import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { AlertsPage } from '@src/pages/alerts.page';
import { DataStorage } from '@common/utils/data-storage';
import { AlertButton } from '@common/types/alert-button.type';

type Context = {
  page: Page;
  pageObj?: AlertsPage;
  timeout: number;
};

Given('the user {string} is on the alerts page', async function (this: Context, user: string) {
  this.pageObj = new AlertsPage(this.page);
  await this.pageObj.openPage();

  await DataStorage.setNamespace('global', 'activeUser', user);
  await DataStorage.setNamespace(user, 'initialized', true);
});


When('the user clicks the {string}', async function (this: Context, buttonName: AlertButton) {
  this.page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

  await this.pageObj.clickButton(buttonName);

  if(buttonName === 'timerAlertButton') {
    await this.page.waitForEvent('dialog', { timeout: 7000 });
  }
});

When('the user clicks the {string} and enters {string}', async function (this: Context, buttonName: AlertButton, input: string) {
  this.page.once('dialog', async (dialog) => {
    await dialog.accept(input);
  });

  await this.pageObj.clickButton(buttonName);
});

Then('the alert with message {string} should be shown and accepted', async function (expectedMessage: string) {
  expect(expectedMessage).toBeTruthy();
});

Then('the confirmation result should be {string}', async function (this: Context, expected: string) {
  const user = await DataStorage.getNamespace<string>('global', 'activeUser');
  const isInitialized = await DataStorage.getNamespace<boolean>(user, 'initialized');

  expect(isInitialized).toBe(true);

  const result = await this.pageObj.getConfirmResult();

  expect(result).toBe(expected);
});

Then('the prompt result should be {string}', async function (this: Context, expected: string) {
  const user = await DataStorage.getNamespace<string>('global', 'activeUser');
  const isInitialized = await DataStorage.getNamespace<boolean>(user, 'initialized');

  expect(isInitialized).toBe(true);

  const result = await this.pageObj.getPromptResult();

  expect(result).toBe(expected);
});

