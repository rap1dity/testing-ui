import { test, expect } from '@playwright/test';
import { AlertsPage } from '@src/pages/alerts.page';

test('Alerts: handle confirm alert', async ({ page }) => {
  const alertsPage = new AlertsPage(page);
  await alertsPage.openPage();

  await test.step('Handle simple alert', async () => {
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('You clicked a button');

      await dialog.accept();
    });

    await alertsPage.clickButton('alertButton');
  });

  await test.step('Handle timer alert', async () => {
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('This alert appeared after 5 seconds');

      await dialog.accept();
    });

    await alertsPage.clickButton('timerAlertButton');

    await page.waitForEvent('dialog', { timeout: 7000 });
  });

  await test.step('Handle confirm alert', async () => {
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Do you confirm action?');

      await dialog.accept();
    });

    await alertsPage.clickButton('confirmButton');
    await expect(page.locator('#confirmResult')).toHaveText('You selected Ok');
  });

  await test.step('Handle prompt alert', async () => {
    const inputText = 'Playwright';

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('Please enter your name');

      await dialog.accept(inputText);
    });

    await alertsPage.clickButton('promptButton');
    await expect(page.locator('#promptResult')).toHaveText(`You entered ${inputText}`);
  });
});

