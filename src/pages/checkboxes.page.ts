import { Page, Locator } from '@playwright/test';
import { BasePage } from '@common/pages/base.page';

export class CheckboxesPage extends BasePage {
  private readonly resultBox: Locator;

  constructor(page: Page) {
    super(page);

    this.resultBox = page.locator('#result');
  }

  async openPage(): Promise<void> {
    await this.open('/checkbox');
  }

  async selectCheckbox(label: string): Promise<void> {
    await this.expandAllParents();

    const checkbox = this.page.locator(`//span[@class='rct-title' and text()='${label}']/ancestor::label`);

    await checkbox.click();
  }

  async isCheckboxReported(result: string): Promise<boolean> {
    const resultVisible = await this.resultBox.isVisible();
    if (!resultVisible) return false;

    const items = this.resultBox.locator('.text-success');
    const count = await items.count();

    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).innerText();
      texts.push(text.trim());
    }

    const joinedText = texts.join(' ');

    return joinedText.toLowerCase() === result.toLowerCase();
  }

  private async expandAllParents(): Promise<void> {
    while (true) {
      const toggle = this.page.locator('.rct-node-collapsed > .rct-text > button').first();
      if (await toggle.count() === 0) break;

      await toggle.scrollIntoViewIfNeeded();
      await toggle.click();
      await this.page.waitForTimeout(100);
    }
  }
}
