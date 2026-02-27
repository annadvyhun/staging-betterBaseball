import { test, expect } from "@playwright/test";
import { SearchComponent } from "../../page-objects/SearchComponent.ts";
import { SearchResultPage } from "../../page-objects/SearchResultPage.ts";

test("Search for gloves", async ({ page }) => {
  const search = new SearchComponent(page);
  const resultsPage = new SearchResultPage(page);

  await page.goto("/");
  await search.searchFor("gloves");
  await resultsPage.waitForPageToLoad();

  // Verifications
  await expect(page).toHaveURL(/result\?q=gloves/);
  await expect(resultsPage.searchTitle).toContainText("gloves");
  await expect(resultsPage.productCards.first()).toBeVisible();

  //const count = await resultsPage.getProductCount();
  //expect(count).toBeGreaterThan(0);
});

test("Search for non-existing product", async ({ page }) => {
  const search = new SearchComponent(page);
  const resultsPage = new SearchResultPage(page);

  await page.goto("/");
  await search.searchFor("apple");
  await resultsPage.waitForPageToLoad();

  await expect(resultsPage.noResultsHeading("apple")).toBeVisible();
  await expect(resultsPage.helpSection).toContainText("or email us");
});

test("Search by SKU using autocomplete", async ({ page }) => {
  const search = new SearchComponent(page);

  await page.goto("/");
  await search.searchFor("CFXPROCSTM");

  await expect(page.locator(".autocomplete-inner")).toBeVisible();

  const productLink = page
    .locator("a.title-container", {
      hasText: "Franklin CFX Pro Custom Adult",
    })
    .first();

  await expect(productLink).toBeVisible({ timeout: 10000 });
  await productLink.click();

  // Verifications
  await expect(page).toHaveURL(
    /franklin-cfx-pro-custom-adult-batting-gloves-cfxprocstm/
  );

  const pageTitle = page.locator('[data-ui-id="page-title-wrapper"]');

  await expect(pageTitle).toBeVisible();
  await expect(pageTitle).toContainText("Franklin CFX Pro Custom Adult");
});
