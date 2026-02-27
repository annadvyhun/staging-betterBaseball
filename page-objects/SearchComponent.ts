//import { test, expect } from "@playwright/test";
import { Page, Locator, expect } from "@playwright/test";

export class SearchComponent {
  page: Page;
  searchInput: Locator;
  searchButton: Locator;
  autocompleteContainer: Locator;
  viewAllResultsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("#search");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.autocompleteContainer = page.locator(".autocomplete-inner");
    this.viewAllResultsButton = page.locator(".bb-ac-topbar__cta");
  }

  async searchFor(text: string) {
    await this.searchInput.pressSequentially(text, { delay: 150 });
    await this.searchButton.click();
  }

  async typeQuery(query: string) {
    await this.searchInput.fill(query);
    await expect(this.autocompleteContainer).toBeVisible();
  }
}
