import { Page, Locator } from "@playwright/test";

export class SearchResultPage {
  page: Page;
  searchTitle: Locator;
  productCards: Locator;
  helpSection: Locator;
  noResultsHeading: (term: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchTitle = page.locator("h1.title.fs-result-page-17bgrm");
    this.productCards = page.locator("[data-product-id]");
    this.helpSection = page.locator(".bb-no-results-help");

    this.noResultsHeading = (term: string) =>
      this.page.getByRole("heading", { name: `No results for "${term}"` });
  }

  //async getSearchTitleText(): Promise<string> {
  // return await this.searchTitle.innerText();
  //}

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  async waitForPageToLoad() {
    await this.page.waitForURL(/result/);
  }

  async waitForNoResultsUI() {
    await this.helpSection.waitFor({ state: "visible" });
  }
}
