import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { RadioButtonsPage } from '@src/pages/radio-buttons.page';
import { DataStorage } from '@common/utils/data-storage';

export type Context = {
  page: Page;
  pageObj?: RadioButtonsPage;
};

Given('the user {string} wants to select the radio option {string}', async function (this: Context, userNamespace: string, option: string) {
  this.pageObj = new RadioButtonsPage(this.page);
  await this.pageObj.openPage();

  await DataStorage.setNamespace(userNamespace, 'radio', option);
});

When('I select the radio button for {string}', async function (this: Context, userNamespace: string) {
  const option = await DataStorage.getNamespace<string>(userNamespace, 'radio');

  await this.pageObj.selectOption(option);
});

Then('the selected radio option should match stored value for {string}', async function (this: Context, userNamespace: string) {
  const expectedOption = await DataStorage.getNamespace<string>(userNamespace, 'radio');

  const selectedOption = await this.pageObj.getSelectedOption();

  expect(selectedOption).toBe(expectedOption.toLowerCase());
});

