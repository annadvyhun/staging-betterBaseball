import { test, expect } from "@playwright/test";

test(
  "TC-003: Verify products are sorted correctly in category",
  {
    tag: ["@category", "@sorting", "@regression"],
  },
  async ({ page }) => {
    await page.goto(
      "https://staging.betterbaseball.com/baseball-equipment/bats/bbcor-bats"
    );

    // LOW TO HIGH
    await page.getByRole("button", { name: "Sort By Popular" }).click();
    await page
      .getByRole("button", { name: "Price: Low to High", exact: true })
      .click();

    //Verify
    await expect(page).toHaveURL(/sort=price_min_to_max/);

    const priceLocators = page.locator(".fs-serp-price .price");
    await expect(priceLocators.first()).toBeVisible();

    // Save the text of the first price so we can use it to wait later
    const firstLowPriceText = await priceLocators.nth(0).innerText();
    const secondLowPriceText = await priceLocators.nth(1).innerText();

    const lowPrice1 = parseFloat(firstLowPriceText.replace("$", ""));
    const lowPrice2 = parseFloat(secondLowPriceText.replace("$", ""));

    console.log(`Checking Low to High: ${lowPrice1} <= ${lowPrice2}`);
    expect(lowPrice1).toBeLessThanOrEqual(lowPrice2);

    // HIGH TO LOW
    await page
      .getByRole("button", { name: "Sort By Price: Low to High" })
      .click();
    await page
      .getByRole("button", { name: "Price: High to Low", exact: true })
      .click();

    //Verify
    await expect(page).toHaveURL(/sort=price_max_to_min/);
    await expect(priceLocators.first()).not.toHaveText(firstLowPriceText);

    const highPriceText1 = await priceLocators.nth(0).innerText();
    const highPriceText2 = await priceLocators.nth(1).innerText();

    const highPrice1 = parseFloat(highPriceText1.replace("$", ""));
    const highPrice2 = parseFloat(highPriceText2.replace("$", ""));

    console.log(`Verifying High to Low: ${highPrice1} >= ${highPrice2}`);
    expect(highPrice1).toBeGreaterThanOrEqual(highPrice2); //this part fails becose multiple products have the exact same price
  }
);

test(
  "TC-004: Verify pagination navigation",
  {
    tag: ["@category", "@sorting", "@regression"],
  },
  async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Bats " }).click();
    await page.getByRole("link", { name: "BASEBALL BATS" }).click();

    // Move to Page 2 using the number
    await page.getByRole("link", { name: "2", exact: true }).first().click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page.getByText("Showing 61-120 of 282 results")).toBeVisible();

    // Move to Page 3 using the "Next" button
    await page
      .locator(".pagination-wrapper")
      .first()
      .getByRole("link")
      .last()
      .click();
    await expect(page).toHaveURL(/page=3/);
    await expect(
      page.getByText("Showing 121-180 of 282 results")
    ).toBeVisible();

    // Go Back to Page 2 using the "Previous" arrow
    await page.locator(".arrow-button-wrapper").first().click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page.getByText("Showing 61-120 of 282 results")).toBeVisible();
  }
);

test(
  "Verify filter by brand and color",
  {
    tag: ["@category", "@sorting", "@regression"],
  },
  async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Bats " }).click();
    await page.getByRole("link", { name: "BASEBALL BATS" }).click();

    await page
      .getByRole("heading", { name: "BASEBALL BATS & SOFTBALL BATS" })
      .getByRole("strong")
      .click();
    await page.getByRole("button", { name: "Brand" }).click();
    await page
      .locator("#fs-filter-collapsed-content-Brand")
      .locator(".checkbox")
      .filter({ hasText: "DeMarini" })
      .click();

    await page.getByRole("button", { name: "Color" }).click();
    await page
      .getByRole("button", { name: "; Variant: Red", exact: true })
      .click();
    await expect(
      page.getByLabel("Active filters").getByText("Red", { exact: true })
    ).toBeVisible();
    await expect(
      page.getByLabel("Active filters").getByText("DeMarini")
    ).toBeVisible();
    await expect(
      page.getByLabel("Active filters").getByText("Red", { exact: true })
    ).toBeVisible();
  }
);
