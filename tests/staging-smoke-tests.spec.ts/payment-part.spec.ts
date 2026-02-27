import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://staging.betterbaseball.com/2026-demarini-voodoo-one-bbcor-baseball-bat-wbd2587010"
  );
  await page.getByLabel("Bat Size").selectOption("9826");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await page.goto("https://staging.betterbaseball.com/checkout/cart/");
  await expect(
    page.getByRole("link", { name: "View cart, You have 1 product" })
  ).toBeVisible();
  await page.getByRole("link", { name: "Checkout" }).click();
  await expect(
    page.getByRole("heading", { name: "Payment Method" })
  ).toBeVisible();
  //Define the Frame and Input
  const stripeFrame = page
    .frameLocator('iframe[name^="__privateStripeFrame"]')
    .first();
  const cardNumberField = stripeFrame.locator("#payment-numberInput");

  // Scroll
  await page
    .locator('iframe[name^="__privateStripeFrame"]')
    .first()
    .scrollIntoViewIfNeeded();

  // Wait and fill

  await cardNumberField.waitFor({ state: "visible", timeout: 20000 });

  await cardNumberField.fill("4111111111111111");
  await stripeFrame.locator("#payment-expiryInput").fill("1229");
  await stripeFrame.locator("#payment-cvcInput").fill("123");
  await stripeFrame.locator("#payment-postalCodeInput").fill("77840");
});
