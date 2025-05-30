import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { SelectMenuPage } from '@src/pages/select-menu.page';
import { DataStorage } from '@common/utils/data-storage';

type Context = {
  page: Page;
  pageObj?: SelectMenuPage;
};

interface ISelectOptions {
  selectValue: string;
  selectOne: string;
  oldSelect: string;
  multiSelect: string[];
}

Given('the user {string} is on the select menu page', async function (this: Context, user: string) {
    this.pageObj = new SelectMenuPage(this.page);
    await this.pageObj.openPage();

    await DataStorage.setNamespace(user, 'selectMenuOpened', true);
  }
);

Given('the user {string} wants to select the following options:', async function (this: Context, user: string, table: DataTable) {
    const selectMenuOpened = await DataStorage.getNamespace<boolean>(user, 'selectMenuOpened');

    if (!selectMenuOpened) {
      throw new Error('User should be on the select menu page');
    }

    const rawOptions = table.rowsHash();
    const parsedOptions: Record<string, unknown> = { ...rawOptions };

    if (rawOptions.multiSelect) {
      parsedOptions.multiSelect = rawOptions.multiSelect.split(',').map((v: string) => v.trim());
    }

    await DataStorage.setNamespace(user, 'selectMenu', parsedOptions);
  }
);

When('the user {string} selects these options', async function (this: Context, user: string) {
    const options = await DataStorage.getNamespace<ISelectOptions>(user, 'selectMenu');

    await this.pageObj.selectOption('selectValue', options.selectValue);
    await this.pageObj.selectOption('selectOne', options.selectOne);
    await this.pageObj.selectOption('oldSelect', options.oldSelect);

    if (options.multiSelect) {
      await this.pageObj.multiSelect(options.multiSelect);
    }
  }
);

Then('the selected options for {string} should be displayed', async function (this: Context, user: string) {
    const options = await DataStorage.getNamespace<ISelectOptions>(user, 'selectMenu');

    const selectedValueText = await this.pageObj.getSelectedText('selectValue');
    expect(selectedValueText).toBe(options.selectValue);

    const selectedOneText = await this.pageObj.getSelectedText('selectOne');
    expect(selectedOneText).toBe(options.selectOne);

    const nativeSelectedText = await this.pageObj.getNativeSelectedText();
    expect(nativeSelectedText).toBe(options.oldSelect);

    if (options.multiSelect && Array.isArray(options.multiSelect)) {
      for (const value of options.multiSelect) {
        const tag = this.pageObj.getMultiValueTag(value);

        await expect(tag).toHaveCount(1);
      }
    }
  }
);
