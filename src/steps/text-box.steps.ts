import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import TextBoxPage from '@src/pages/text-box.page';
import { DataStorage } from '@common/utils/data-storage';
import { IUserAddress } from '@common/interfaces/user-address.interface';

type Context = {
  page: Page;
  pageObj?: TextBoxPage;
};

Given('the user {string} is on the text box page', async function (this: Context, user: string) {
    this.pageObj = new TextBoxPage(this.page);
    await this.pageObj.openPage();

    await DataStorage.setNamespace(user, 'textBoxOpened', true);
  }
);

Given('the user {string} has the following text box data:', async function (this: Context, user: string, table: DataTable) {
    const textBoxOpened = await DataStorage.getNamespace<boolean>(user, 'textBoxOpened');

    if (!textBoxOpened) {
      throw new Error('User should be on the text box page');
    }

    const [data] = table.hashes();

    await DataStorage.setNamespace(user, 'textBoxData', data);
  }
);

When('the user {string} fills in the text box form with this data', async function (this: Context, user: string) {
    const data = await DataStorage.getNamespace<IUserAddress>(user, 'textBoxData');

    await this.pageObj.fillForm(data);
  }
);

Then('the output should contain the data for {string}', async function (this: Context, user: string) {
    const data = await DataStorage.getNamespace<IUserAddress>(user, 'textBoxData');

    const output = await this.pageObj.getOutput();

    expect(output).toContain(data.name);
    expect(output).toContain(data.email);
    expect(output).toContain(data.current);
    expect(output).toContain(data.permanent);
  }
);
