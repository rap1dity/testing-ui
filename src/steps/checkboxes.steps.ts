import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { CheckboxesPage } from '@src/pages/checkboxes.page';
import { DataStorage } from '@common/utils/data-storage';

type Context = {
  page: Page;
  pageObj?: CheckboxesPage;
};

Given('the user {string} wants to select the checkbox {string}', async function (this: Context, userNamespace: string, label: string) {
  this.pageObj = new CheckboxesPage(this.page);
  await this.pageObj.openPage();

  await DataStorage.setNamespace(userNamespace, 'checkboxLabel', label);
});

When('I select the checkbox for {string}', async function (this: Context, userNamespace: string) {
  const label = await DataStorage.getNamespace<string>(userNamespace, 'checkboxLabel');

  await this.pageObj.selectCheckbox(label);
});

Then('the checkbox result should be equal to {string}', async function (this: Context, result: string) {
  const isEqual = await this.pageObj.isCheckboxReported(result);

  expect(isEqual).toBe(true);
});

