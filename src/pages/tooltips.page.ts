import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@common/pages/base.page';

export default class TooltipsPage extends BasePage {
  private readonly selectors: Record<string, Locator>;

  constructor(page: Page) {
    super(page);

    this.selectors = {
      button: page.locator('#toolTipButton'),
      field: page.locator('#toolTipTextField'),
      tooltip: page.locator('.tooltip-inner')
    };
  }

  async openPage(): Promise<void> {
    await this.open('/tool-tips');
  }

  async hoverElement(selectorKey: keyof typeof this.selectors): Promise<void> {
    await this.selectors[selectorKey].hover();

    await this.page.waitForSelector('.tooltip-inner', { state: 'visible' });
  }

  async getTooltipText(expectedText: string): Promise<string> {
    const tooltip = this.page.locator('.tooltip-inner').filter({ hasText: expectedText });

    await expect(tooltip).toBeVisible();

    return await tooltip.innerText();
  }
}
