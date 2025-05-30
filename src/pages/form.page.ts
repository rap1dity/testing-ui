import { BasePage } from '@common/pages/base.page';
import { Locator, Page } from '@playwright/test';
import { IUserData } from '@common/interfaces/user-data.interface';

export class FormPage extends BasePage {
  private readonly selectors: Record<string, Locator>;

  constructor(page: Page) {
    super(page);

    this.selectors = {
      firstName: page.locator('#firstName'),
      lastName: page.locator('#lastName'),
      email: page.locator('#userEmail'),
      genderMale: page.locator('label[for="gender-radio-1"]'),
      mobile: page.locator('#userNumber'),
      submit: page.locator('#submit'),
      resultModal: page.locator('.modal-content'),
    };
  }

  async openPage(): Promise<void> {
    await this.open('/automation-practice-form');
  }

  async fillRequiredFields(user: IUserData): Promise<IUserData> {
    await this.selectors.firstName.fill(user.firstName);
    await this.selectors.lastName.fill(user.lastName);
    await this.selectors.email.fill(`${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@test.com`);
    await this.selectors.genderMale.click();
    await this.selectors.mobile.fill(user.phoneNumber);

    return user;
  }

  async submitForm(): Promise<void> {
    await this.selectors.submit.click();
  }

  async getResultText(): Promise<string> {
    return await this.selectors.resultModal.innerText();
  }
}