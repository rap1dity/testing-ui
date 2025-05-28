import { test, expect } from '@playwright/test';
import { AlertsPage } from '@src/pages/alerts.page';

test('Alerts: handle confirm alert', async ({ page }) => {
  const alertsPage = new AlertsPage(page);
  await alertsPage.openPage();

  await test.step('Handle confirm alert', async () => {
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Do you confirm');
      await dialog.accept();
    });

    await alertsPage.clickButton('confirmButton');
  });
});

