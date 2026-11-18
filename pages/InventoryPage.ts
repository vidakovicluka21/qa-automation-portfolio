import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly resetAppStateLink: Locator;
  readonly closeMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
  }

  async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async resetAppState() {
    await this.menuButton.click();
    await this.resetAppStateLink.click();
    await this.closeMenuButton.click();
  }
}
