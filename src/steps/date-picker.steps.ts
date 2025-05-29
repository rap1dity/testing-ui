import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { DatePickerPage } from '@src/pages/date-picker.page';
import { DataStorage } from '@common/utils/data-storage';

export type Context = {
  page: Page;
  pageObj?: DatePickerPage;
};

Given(
  'a date {string} is set in storage for user {string}',
  async function (this: Context, date: string, userNamespace: string) {
    this.pageObj = new DatePickerPage(this.page);
    await this.pageObj.openPage();

    await DataStorage.setNamespace(userNamespace, 'date', date);
  }
);

When(
  'I fill the date picker field using the stored date for {string}',
  async function (this: Context, userNamespace: string) {
    const date = await DataStorage.getNamespace<string>(userNamespace, 'date');

    await this.pageObj.fillDate(date);
  }
);

Then(
  'the date picker field should contain the stored date for {string}',
  async function (this: Context, userNamespace: string) {
    const expectedDate = await DataStorage.getNamespace(userNamespace, 'date');
    const actualDate = await this.pageObj.getDate();

    expect(actualDate).toBe(expectedDate);
  }
);
