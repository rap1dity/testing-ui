import { test, expect } from '@playwright/test';
import { FormPage } from '@src/pages/form.page';

test('Form: fill and submit required fields', async ({ page }) => {
  const form = new FormPage(page);
  await form.openPage();

  const user = await form.fillRequiredFields();
  await form.submitForm();

  const text = await form.getResultText();

  expect(text).toContain(user.firstName);
  expect(text).toContain(user.lastName);
  expect(text).toContain(user.phoneNumber);
});
