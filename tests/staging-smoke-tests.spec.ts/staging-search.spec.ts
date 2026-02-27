import { test, expect } from "@playwright/test";

test("Search for gloves", async ({ page }) => {
  await page.goto("https://staging.betterbaseball.com/");

  const searchInput = page.locator("#search");
  await searchInput.pressSequentially("gloves", { delay: 150 });
  await page.getByRole("button", { name: "Search" }).click();

  // Wait for the results
  await expect(page).toHaveURL(
    "https://staging.betterbaseball.com/instantsearchplus/result?q=gloves"
  );
});

test("Search for DeMarini Voodoo One", async ({ page }) => {
  await page.goto("https://staging.betterbaseball.com/");

  const searchInput = page.locator("#search");
  await searchInput.pressSequentially("2026 DeMarini Voodoo One", {
    delay: 150,
  });
  await page.keyboard.press("Enter");

  //await expect(page).toHaveURL("https://staging.betterbaseball.com/instantsearchplus/result?q=2026+DeMarini+Voodoo+One");
  await expect(page.getByRole("heading", { name: /results/i })).toBeVisible({
    timeout: 15000,
  });
});
