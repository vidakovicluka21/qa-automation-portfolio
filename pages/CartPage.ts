import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly removeBackpackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  }

  async removeBackpackFromCart() {
    await this.removeBackpackButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
