import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { DragAndDropPage } from '@src/pages/drag-and-drop.page';
import { DataStorage } from '@common/utils/data-storage';

type Context = {
  page: Page;
  pageObj?: DragAndDropPage;
};

Given('the user {string} is on the drag and drop page', async function (this: Context, userNamespace: string) {
  this.pageObj = new DragAndDropPage(this.page);
  await this.pageObj.openPage();

  await DataStorage.setNamespace(userNamespace, 'active', true);
});

When('the user {string} performs drag and drop action', async function (this: Context, userNamespace: string) {
  const isActive = await DataStorage.getNamespace(userNamespace, 'active');

  if (!isActive) {
    throw new Error(`User "${userNamespace}" is not active`);
  }

  await this.pageObj.performDragAndDrop();
});

Then('the drop result for {string} should be {string}', async function (this: Context, userNamespace: string, expectedResult: string) {
  const isActive = await DataStorage.getNamespace<boolean>(userNamespace, 'active');

  if (!isActive) {
    throw new Error(`User "${userNamespace}" is not active`);
  }

  const result = await this.pageObj.getDropResult();

  expect(result?.trim()).toBe(expectedResult);
});
