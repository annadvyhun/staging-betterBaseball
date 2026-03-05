import { test, expect } from "@playwright/test";

//test fails, since options are missing

test(
  "TC-001: Should buy 2026 Louisville Slugger Supra 8",
  {
    tag: ["@e2e", "@smoke", "@checkout"],
  },
  async ({ page }) => {
    await page.goto("/");

    // Search for product
    const searchInput = page.locator("#search");
    await searchInput.click();
    await searchInput.pressSequentially("2026 Louisville Slugger Supra 8", {
      delay: 150,
    });

    // Trigger search
    await page.getByRole("button", { name: "Search" }).click();

    // Wait for the results
    await expect(page.getByRole("heading", { name: /results/i })).toBeVisible({
      timeout: 15000,
    });

    await page
      .getByRole("link", {
        name: "2026 Louisville Slugger Supra Drop 8 USSSA Baseball Bat: SLSRX8",
        exact: true,
      })
      .click();

    //Select option
    //await page.getByLabel("Bat Size").selectOption("9825");

    const batSizeDropdown = page.locator("#attribute198");
    await batSizeDropdown.selectOption({
      label: "29 In 21 Oz $399.95 (In Stock)",
    });

    const addToCartButton = page.locator("#product-addtocart-button");
    await addToCartButton.click();

    await page.goto("https://staging.betterbaseball.com/checkout/cart/");

    //Verify Cart Page and added product in the cart
    await expect(page).toHaveURL(
      "https://staging.betterbaseball.com/checkout/cart/"
    );
    await expect(
      page.getByRole("link", { name: "View cart, You have 1 product" })
    ).toBeVisible({ timeout: 10000 });

    //Go to checkout
    await page.getByRole("link", { name: "Checkout" }).click();

    await page
      .locator(".loading-mask")
      .waitFor({ state: "detached", timeout: 20000 })
      .catch(() => {});

    // Enter First Name
    const firstName = page.locator("#shipping-firstname");
    //await firstName.waitFor({ state: "visible" });
    await firstName.fill("Anna");

    // Enter Last Name
    const lastName = page.locator("#shipping-lastname");
    await lastName.waitFor({ state: "visible" });
    await lastName.fill("QA");

    // Enter Email
    const emailInput = page
      .locator(
        '#customer-email, #shipping-email, input[name="username"], input[type="email"]'
      )
      .first();

    // Increase timeout
    await emailInput.waitFor({ state: "visible", timeout: 15000 });

    // Clear it first
    await emailInput.clear();
    await emailInput.fill("anna.dvyhun@helix-solutions.ai");

    //Fill up address details
    await page.getByRole("textbox", { name: "Phone" }).fill("(197) 969-6959");
    await page
      .getByRole("textbox", { name: "Address" })
      .fill("1929 Texas Ave S");
    await expect(page.getByRole("textbox", { name: "City" })).toBeVisible();
    await page.getByRole("textbox", { name: "City" }).fill("College Station");
    await page.getByLabel("State").selectOption("57");
    await page.getByRole("textbox", { name: "Zip Code" }).fill("77840");

    //Continue to payment
    await expect(
      page.getByRole("heading", { name: "Payment Method" })
    ).toBeVisible();
    // 1. Define the Frame and the Input
    const stripeFrame = page
      .frameLocator('iframe[name^="__privateStripeFrame"]')
      .first();
    const cardNumberField = stripeFrame.locator("#payment-numberInput");

    // Scroll the ACTUAL iframe into view
    await page
      .locator('iframe[name^="__privateStripeFrame"]')
      .first()
      .scrollIntoViewIfNeeded();

    //Fill card details

    await cardNumberField.waitFor({ state: "visible", timeout: 20000 });

    await cardNumberField.fill("4111111111111111");
    await stripeFrame.locator("#payment-expiryInput").fill("1229");
    await stripeFrame.locator("#payment-cvcInput").fill("123");

    //await stripeFrame.locator("#payment-postalCodeInput").fill("77840");
    const zipCode = stripeFrame.locator("#payment-postalCodeInput");
    if (await zipCode.isVisible()) {
      await zipCode.fill("77840");
    }
  }
);
