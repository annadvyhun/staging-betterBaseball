import { test, expect } from "@playwright/test";

test(
  "TC-002: Should buy Valle Eagle 27 @e2e @smoke @checkout",
  {
    tag: ["@e2e", "@smoke", "@checkout"],
  },
  async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Gloves ", exact: true }).click();
    await page
      .getByRole("link", { name: "BASEBALL GLOVES", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "GLOVES & MITTS" }).getByRole("strong")
    ).toBeVisible();
    await page.getByText("Valle Eagle 27\" Catcher's Training Mitt").click();
    const gloveHandDropdown = page.locator("#attribute176");
    await gloveHandDropdown.selectOption({
      label: "Left Hand Thrower $164.99 (In Stock)",
    });
    //await page.getByRole("button", { name: "Add to Cart" }).click();

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
    await firstName.waitFor({ state: "visible" });
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
    await stripeFrame.locator("#payment-postalCodeInput").fill("77840");
  }
);
