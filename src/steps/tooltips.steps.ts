import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import TooltipsPage from '@src/pages/tooltips.page';
import { DataStorage } from '@common/utils/data-storage';

export type Context = {
  page: Page;
  pageObj?: TooltipsPage;
};

interface ITooltipData {
  element: string;
  tooltipText: string;
}

Given('the user {string} is on the tooltips page', async function (this: Context, user: string) {
    this.pageObj = new TooltipsPage(this.page);
    await this.pageObj.openPage();

    await DataStorage.setNamespace(user, 'tooltipsOpened', true);
  }
);

When('the user {string} hovers over the following elements:', async function (this: Context, user: string, table: DataTable) {
    const tooltipsOpened = await DataStorage.getNamespace<boolean>(user, 'tooltipsOpened');

    if (!tooltipsOpened) {
      throw new Error('User should be on the tooltips page');
    }

    const data = table.hashes();

    await DataStorage.setNamespace(user, 'tooltips', data);

    for (const { element } of data) {
      await this.pageObj.hoverElement(element);
    }
  }
);

Then('the tooltip text should be correct for each element for {string}', async function (this: Context, user: string) {
    const data = await DataStorage.getNamespace<ITooltipData[]>(user, 'tooltips');

    for (const { element, tooltipText } of data) {
      await this.pageObj.hoverElement(element);

      const actual = await this.pageObj.getTooltipText(tooltipText);

      expect(actual).toBe(tooltipText);
    }
  }
);
