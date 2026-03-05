import { test, expect } from "@playwright/test";

test(
  "Smoke; Verify updating item quantity for single product",
  {
    tag: ["@cart", "@smoke", "@regression"],
  },
  async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "SHOP LIFESTYLE" }).click();

    //Verifications
    await expect(
      page.getByRole("heading", { name: "LIFESTYLE APPAREL & ACCESSORIES" })
    ).toBeVisible();
    await expect(page.locator(".product-card").first()).toBeVisible();

    //Add product to cart
    await page
      .getByRole("link", {
        name: "Speedster Silver Long Sleeve Hoodie: SPEEDSTER-SILVER",
        exact: true,
      })
      .click();
    //S
    await page.getByLabel("Size").selectOption({
      label: "S $34.95 (In Stock)",
    });
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await expect(page).toHaveURL(
      "https://staging.betterbaseball.com/checkout/cart/",
      { timeout: 15000 }
    );
    await expect(
      page.getByRole("link", { name: "View cart, You have 1 product" })
    ).toBeVisible();

    //update quantity
    await page.getByRole("button", { name: "+" }).click();
    const cartCounter = page.locator('span[x-text="cart.summary_count"]');
    await expect(cartCounter).toHaveText("2", { timeout: 10000 });

    await page.getByRole("button", { name: "-" }).click();
    await expect(cartCounter).toHaveText("1", { timeout: 10000 });
  }
);

test(
  "Verify updating different sizes in the cart",
  {
    tag: ["@cart", "@smoke", "@regression"],
  },
  async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "SHOP LIFESTYLE" }).click();

    //Verifications
    await expect(
      page.getByRole("heading", { name: "LIFESTYLE APPAREL & ACCESSORIES" })
    ).toBeVisible();
    await expect(page.locator(".product-card").first()).toBeVisible();

    //Add product to cart
    await page
      .getByRole("link", {
        name: "Speedster Silver Long Sleeve Hoodie: SPEEDSTER-SILVER",
        exact: true,
      })
      .click();
    //S
    await page.getByLabel("Size").selectOption({
      label: "S $34.95 (In Stock)",
    });
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await expect(page).toHaveURL(
      "https://staging.betterbaseball.com/checkout/cart/",
      { timeout: 15000 }
    );
    await expect(
      page.getByRole("link", { name: "View cart, You have 1 product" })
    ).toBeVisible();
    //M
    await page.getByText("Speedster Silver Long Sleeve").click();
    await page.getByLabel("Size").selectOption({
      label: "M $34.95 (In Stock)",
    });
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await expect(page).toHaveURL(
      "https://staging.betterbaseball.com/checkout/cart/",
      { timeout: 15000 }
    );
    await expect(
      page.getByRole("link", { name: "View cart, You have 2" })
    ).toBeVisible();

    //update quantity
    const rowS = page.locator(".item").filter({ hasText: "Size: S" });
    await rowS.getByRole("button", { name: "+" }).click();
    const cartBadge = page.locator('span[x-text="cart.summary_count"]');
    await expect(cartBadge).toHaveText("3", { timeout: 10000 });

    const rowM = page.locator(".item").filter({ hasText: "Size: M" });
    await rowM.getByRole("button", { name: "+" }).click();
    await expect(cartBadge).toHaveText("4", { timeout: 10000 });
  }
);

//await expect(page.getByRole("link", { name: "View cart, You have 3" })).toBeVisible();

//Use a Regex (the /.../i)
//await expect(page.getByRole("link", { name: /View cart/i })).toContainText("3", { timeout: 10000 });

//check badge qty
//await rowS.getByRole("button", { name: "+" }).click();
//const cartBadge = page.locator('span[x-text="cart.summary_count"]');
//await expect(cartBadge).toHaveText("3");

test(
  "clear-shopping-cart",
  {
    tag: ["@cart", "@smoke", "@regression"],
  },
  async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "SHOP BATS", exact: true }).click();

    await page.getByRole("link", { name: "Gloves ", exact: true }).click();
    await page
      .getByRole("link", { name: "BASEBALL GLOVES", exact: true })
      .click();
    await page
      .getByRole("link", {
        name: "Wilson A2000 SA17 12\" Pitcher's Glove: WBW103362",
        exact: true,
      })
      .click();
    //add to cart
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

    //Go back to shopping
    await page.getByRole("link", { name: "Bats " }).click();
    await page.getByRole("link", { name: "USSSA Bats" }).click();
    await page
      .getByRole("link", {
        name: "2026 Louisville Slugger Supra Drop 8 USSSA Baseball Bat: SLSRX8",
        exact: true,
      })
      .click();

    const batSizeDropdown = page.locator("#attribute198");
    await batSizeDropdown.selectOption({
      label: "31 In 23 Oz $399.95 (In Stock)",
    });

    //Add to cart
    await addToCartButton.click();
    await expect(
      page.getByRole("link", { name: "View cart, You have 2" })
    ).toBeVisible();

    //Remove products from the cart
    await page
      .getByRole("button", { name: 'Remove Wilson A2000 SA17 12"' })
      .click();
    await expect(
      page.getByRole("link", { name: "View cart, You have 1 product" })
    ).toBeVisible({ timeout: 10000 });
    await page.getByRole("button", { name: "Remove 2026 Louisville" }).click();

    //Verify empty cart
    await expect(page.getByText("Your Cart Back to Shopping")).toBeVisible();
    await expect(page.locator("#maincontent")).toContainText(
      "You have no items in your shopping cart."
    );
    await expect(page.locator("#maincontent")).toContainText(
      "Click here to continue shopping."
    );
  }
);
