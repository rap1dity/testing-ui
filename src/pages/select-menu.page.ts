import { Page, Locator } from '@playwright/test';
import { BasePage } from '@common/pages/base.page';

export default class SelectMenuPage extends BasePage {
  private selectors: Record<string, Locator>;

  constructor(page: Page) {
    super(page);
    this.selectors = {
      selectValue: page.locator('#withOptGroup'),
      selectOne: page.locator('#selectOne'),
      oldSelect: page.locator('#oldSelectMenu'),
      multiSelect: page.locator('#react-select-4-input'),
    };
  }

  async openPage(): Promise<void> {
    await this.open('/select-menu');
  }

  async selectOption(selectorKey: keyof typeof this.selectors, label: string): Promise<void> {
    if (selectorKey === 'oldSelect') {
      await this.selectors[selectorKey].selectOption({ label });
    } else {
      await this.selectors[selectorKey].click();
      await this.page.locator(`text="${label}"`).click();
    }
  }

  async multiSelect(values: string[]): Promise<void> {
    for (const value of values) {
      await this.selectors.multiSelect.fill(value);

      await this.page.keyboard.press('Enter');
    }
  }

  async getSelectedText(selectorKey: keyof typeof this.selectors): Promise<string> {
    const container = this.selectors[selectorKey];

    const text = await container.locator('div[class*="singleValue"]').innerText();

    return text.trim();
  }
}
