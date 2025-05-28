import { Page, Locator } from '@playwright/test';
import { BasePage } from '@common/pages/base.page';

export default class TextBoxPage extends BasePage {
  private readonly selectors: Record<string, Locator>;

  constructor(page: Page) {
    super(page);

    this.selectors = {
      fullName: page.locator('#userName'),
      email: page.locator('#userEmail'),
      currentAddress: page.locator('#currentAddress'),
      permanentAddress: page.locator('#permanentAddress'),
      submit: page.locator('#submit'),
      output: page.locator('#output'),
    };
  }

  async openPage(): Promise<void> {
    await this.open('/text-box');
  }

  async fillForm(data: { name: string; email: string; current: string; permanent: string }): Promise<void> {
    await this.selectors.fullName.fill(data.name);
    await this.selectors.email.fill(data.email);
    await this.selectors.currentAddress.fill(data.current);
    await this.selectors.permanentAddress.fill(data.permanent);

    await this.selectors.submit.click();
  }

  async getOutput(): Promise<string> {
    return await this.selectors.output.innerText();
  }
}
