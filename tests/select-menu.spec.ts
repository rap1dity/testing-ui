import { expect, test } from '@playwright/test';
import SelectMenuPage from '@src/pages/select-menu.page';

test('SelectMenu: select options from all dropdowns', async ({ page }) => {
  const selectMenu = new SelectMenuPage(page);
  await selectMenu.openPage();

  await selectMenu.selectOption('selectValue', 'Group 2, option 1');
  const selectedValueText = await selectMenu.getSelectedText('selectValue');
  expect(selectedValueText).toBe('Group 2, option 1');

  await selectMenu.selectOption('selectOne', 'Other');
  const selectedOneText = await selectMenu.getSelectedText('selectOne');
  expect(selectedOneText).toBe('Other');

  await selectMenu.selectOption('oldSelect', 'Green');
  const nativeSelectedValue = await page.locator('#oldSelectMenu').inputValue();
  const nativeSelectedText = await page
    .locator(`#oldSelectMenu option[value="${nativeSelectedValue}"]`)
    .textContent();
  expect(nativeSelectedText?.trim()).toBe('Green');

  const multiValues = ['Black', 'Blue'];
  await selectMenu.multiSelect(multiValues);

  for (const value of multiValues) {
    const tag = page.locator('//div[contains(@class, "-multiValue") and .//div[text()="' + value + '"]]');

    await expect(tag).toHaveCount(1);
  }

});
