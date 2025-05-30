import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { FormPage } from '@src/pages/form.page';
import { DataStorage } from '@common/utils/data-storage';
import { IUserData } from '@common/interfaces/user-data.interface';

type Context = {
  page: Page;
  pageObj?: FormPage;
};

Given('the user {string} is on the form page', async function (this: Context, user: string) {
    this.pageObj = new FormPage(this.page);
    await this.pageObj.openPage();

    await DataStorage.setNamespace(user, 'formStarted', true);
  }
);

Given('the user {string} has the following data:', async function (this: Context, user: string, table: DataTable) {
    const [userData] = table.hashes();

    await DataStorage.setNamespace(user, 'userData', userData);
  }
);

When('the user {string} fills in the required fields with this data', async function (this: Context, user: string) {
    const userData = await DataStorage.getNamespace<IUserData>(user, 'userData');

    if (!userData) {
      throw new Error('No user data found in DataStorage');
    }

    await this.pageObj.fillRequiredFields(userData);
  }
);

When('the user {string} submits the form', async function (this: Context, user: string) {
    await this.pageObj.submitForm();

    await DataStorage.setNamespace(user, 'isSent', true);
  }
);

Then('the submitted form should contain the data for {string}', async function (this: Context, user: string) {
    const resultText = await this.pageObj.getResultText();

    const userData = await DataStorage.getNamespace<IUserData>(user, 'userData');
    const isSent = await DataStorage.getNamespace<boolean>(user, 'isSent');

    if(!isSent) {
      throw new Error('The form is not sent');
    }

    expect(resultText).toContain(userData.firstName);
    expect(resultText).toContain(userData.lastName);
    expect(resultText).toContain(userData.phoneNumber);
  }
);
