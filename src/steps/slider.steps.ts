import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { SliderPage } from '@src/pages/slider.page';
import { DataStorage } from '@common/utils/data-storage';

export type Context = {
  page: Page;
  pageObj?: SliderPage;
};

Given(
  'slider value for user {string} is set to {string}',
  async function (this: Context, userNamespace: string, value: string) {
    this.pageObj = new SliderPage(this.page);
    await this.pageObj.openPage();

    await DataStorage.setNamespace(userNamespace, 'sliderValue', value);
  }
);

When(
  'I drag the slider to the value from storage for {string}',
  async function (this: Context, userNamespace: string) {
    const value = await DataStorage.getNamespace(userNamespace, 'sliderValue');

    await this.pageObj.setSliderValue(Number(value));
  }
);

Then(
  'the slider value should match the one in storage for {string}',
  async function (this: Context, userNamespace: string) {
    const expectedValue = await DataStorage.getNamespace(userNamespace, 'sliderValue');
    const actualValue = await this.pageObj.getSliderValue();

    expect(actualValue).toBe(expectedValue);
  }
);
