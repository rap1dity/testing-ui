import { BasePage } from '@common/pages/base.page';
import { Locator, Page } from '@playwright/test';
import { AlertButton } from '@common/types/alert-button.type';

export class AlertsPage extends BasePage {
  private readonly buttonSelectors: Record<AlertButton, Locator>;

  constructor(page: Page) {
    super(page);

    this.buttonSelectors = {
      alertButton: page.locator('#alertButton'),
      timerAlertButton: page.locator('#timerAlertButton'),
      confirmButton: page.locator('#confirmButton'),
      promptButton: page.locator('#promtButton'),
    };
  }

  async openPage(): Promise<void> {
    await this.open('/alerts');
  }

  async clickButton(button: AlertButton): Promise<void> {
    await this.buttonSelectors[button].waitFor({ state: 'visible' });

    await this.buttonSelectors[button].click();
  }
}