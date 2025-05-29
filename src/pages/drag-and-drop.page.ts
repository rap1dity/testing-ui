import { Locator, Page } from '@playwright/test';
import { BasePage } from '@common/pages/base.page';

export class DragAndDropPage extends BasePage {
  private readonly source: Locator;
  private readonly target: Locator;

  constructor(page: Page) {
    super(page);
  }

  async openPage(): Promise<void> {
    await this.open('/droppable');
  }

  async performDragAndDrop(): Promise<void> {
    const simpleTab = this.page.getByRole('tabpanel', { name: 'Simple' });

    const source = simpleTab.locator('#draggable');
    const target = simpleTab.locator('#droppable');

    await source.dragTo(target);
  }

  async getDropResult(): Promise<string | null> {
    const simpleTab = this.page.getByRole('tabpanel', { name: 'Simple' });

    return simpleTab.locator('#droppable p').textContent();
  }
}
