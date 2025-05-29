import { Locator, Page } from '@playwright/test';
import { BasePage } from '@common/pages/base.page';

export class SliderPage extends BasePage {
  private readonly slider: Locator;
  private readonly sliderValue: Locator;

  constructor(page: Page) {
    super(page);
    
    this.slider = page.locator('input[type="range"]');
    this.sliderValue = page.locator('#sliderValue');
  }

  async openPage(): Promise<void> {
    await this.open('/slider');
  }

  async setSliderValue(value: number): Promise<void> {
    const current = parseInt(await this.sliderValue.inputValue());
    const step = value > current ? 'ArrowRight' : 'ArrowLeft';
    const times = Math.abs(value - current);

    for (let i = 0; i < times; i++) {
      await this.slider.press(step);
    }
  }

  async getSliderValue(): Promise<string> {
    return this.sliderValue.inputValue();
  }
}
