import { test, expect } from '@playwright/test';
import TextBoxPage from '@src/pages/text-box.page';
import Fakerator from 'fakerator';

const fakerator = Fakerator();

test('TextBox: fill and submit data', async ({ page }) => {
  const textBox = new TextBoxPage(page);
  await textBox.openPage();

  const data = {
    name: fakerator.names.name(),
    email: fakerator.internet.email(),
    current: fakerator.address.street(),
    permanent: fakerator.address.street(),
  };

  await textBox.fillForm(data);
  const output = await textBox.getOutput();

  expect(output).toContain(data.name);
  expect(output).toContain(data.email);
  expect(output).toContain(data.current);
  expect(output).toContain(data.permanent);
});
