import { Page, Locator } from '@playwright/test';
import { BasePage } from '@common/pages/base.page';

export class RadioButtonsPage extends BasePage {
  private readonly yesOption: Locator;
  private readonly impressiveOption: Locator;
  private readonly resultText: Locator;

  constructor(page: Page) {
    super(page);

    this.yesOption = page.locator('label[for="yesRadio"]');
    this.impressiveOption = page.locator('label[for="impressiveRadio"]');
    this.resultText = page.locator('.text-success');
  }

  async openPage(): Promise<void> {
    await this.page.goto('/radio-button');
  }

  async selectOption(option: string): Promise<void> {
    switch (option.toLowerCase()) {
      case 'yes':
        await this.yesOption.click();
        break;
      case 'impressive':
        await this.impressiveOption.click();
        break;
      default:
        throw new Error(`Unsupported option: ${option}`);
    }
  }

  async getSelectedOption(): Promise<string> {
    return (await this.resultText.textContent())?.trim().toLowerCase() ?? '';
  }
}
