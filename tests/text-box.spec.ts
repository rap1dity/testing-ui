import { test, expect } from '@playwright/test';
import TextBoxPage from '@src/pages/text-box.page';

test('TextBox: fill and submit data', async ({ page }) => {
  const textBox = new TextBoxPage(page);
  await textBox.openPage();

  const data = {
    name: 'Some Person',
    email: 'some.person@gmail.com',
    current: '32312 Current',
    permanent: '4363 Permanent',
  };

  await textBox.fillForm(data);
  const output = await textBox.getOutput();

  expect(output).toContain(data.name);
  expect(output).toContain(data.email);
  expect(output).toContain(data.current);
  expect(output).toContain(data.permanent);
});
