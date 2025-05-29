import { Locator, Page } from '@playwright/test';
import { BasePage } from '@common/pages/base.page';

export class DatePickerPage extends BasePage {
  private readonly input: Locator;
  constructor(page: Page) {
    super(page);

    this.input = page.locator('#datePickerMonthYearInput');
  }

  async openPage(): Promise<void> {
    await this.open('/date-picker');
  }

  async fillDate(value: string): Promise<void> {
    await this.input.fill(value);

    await this.input.press('Enter');
  }

  async getDate(): Promise<string> {
    return this.input.inputValue();
  }
}
