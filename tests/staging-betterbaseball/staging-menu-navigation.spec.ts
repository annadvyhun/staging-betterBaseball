import { test, expect } from "@playwright/test";

test("Should navigate to Baseball Bats subcategory", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Bats " }).click();
  await page.getByRole("link", { name: "BASEBALL BATS" }).click();
  await expect(page.locator("#category-view-container")).toContainText(
    "BASEBALL BATS & SOFTBALL BATS"
  );
  await expect(page).toHaveURL(
    "https://staging.betterbaseball.com/baseball-equipment/bats"
  );
});

test("Should navigate to BBCOR Bats", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Bats " }).click();
  await page.getByRole("link", { name: "BBCOR Bats" }).click();
  await expect(
    page
      .getByRole("heading", { name: "BBCOR BATS", exact: true })
      .getByRole("strong")
  ).toBeVisible();
  await expect(page).toHaveURL(
    "https://staging.betterbaseball.com/baseball-equipment/bats/bbcor-bats"
  );
});

test("Should navigate to Baseball Gloves subcategory", async ({ page }) => {
  await page.goto("https://staging.betterbaseball.com/");
  await page.getByRole("link", { name: "Gloves ", exact: true }).click();
  await page
    .getByRole("link", { name: "BASEBALL GLOVES", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "GLOVES & MITTS" }).getByRole("strong")
  ).toBeVisible();
  await expect(page).toHaveURL(
    "https://staging.betterbaseball.com/baseball-equipment/gloves-mitts"
  );
});
