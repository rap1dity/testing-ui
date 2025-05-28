import { expect, test } from '@playwright/test';
import ToolTipsPage from '@src/pages/tooltips.page';

test('ToolTips: check tooltip text', async ({ page }) => {
  const toolTips = new ToolTipsPage(page);
  await toolTips.openPage();

  await toolTips.hoverElement('button');
  const buttonTooltip = await toolTips.getTooltipText('You hovered over the Button');
  expect(buttonTooltip).toBe('You hovered over the Button');

  await toolTips.hoverElement('field');
  const fieldTooltip = await toolTips.getTooltipText('You hovered over the text field');
  expect(fieldTooltip).toBe('You hovered over the text field');
});
