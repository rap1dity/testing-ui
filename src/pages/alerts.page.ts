import { BasePage } from '@common/pages/base.page';
import { Locator, Page } from '@playwright/test';
import { AlertButton } from '@common/types/alert-button.type';

export class AlertsPage extends BasePage {
  private readonly buttonSelectors: Record<AlertButton, Locator>;
  private readonly confirmResult: Locator;
  private readonly promptResult: Locator;

  constructor(page: Page) {
    super(page);

    this.buttonSelectors = {
      alertButton: page.locator('#alertButton'),
      timerAlertButton: page.locator('#timerAlertButton'),
      confirmButton: page.locator('#confirmButton'),
      promptButton: page.locator('#promtButton'),
    };

    this.confirmResult = page.locator('#confirmResult');
    this.promptResult = page.locator('#promptResult');
  }

  async openPage(): Promise<void> {
    await this.open('/alerts');
  }

  async clickButton(button: AlertButton): Promise<void> {
    await this.buttonSelectors[button].waitFor({ state: 'visible' });

    await this.buttonSelectors[button].click();
  }

  async getConfirmResult(): Promise<string> {
    return this.confirmResult.innerText();
  }

  async getPromptResult(): Promise<string> {
    return this.promptResult.innerText();
  }
}