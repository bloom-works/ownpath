import { test, expect } from "@playwright/test";

const baseURL = process.env.URL || "http://localhost:3000";
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test("Homepage has content and search works", async ({ page }) => {
  await expect(page).toHaveTitle(/OwnPath/);
  const search = page.locator("button:visible", {
    hasText: "Search",
  });

  await page.locator("#desktop_zip").fill("80012");
  await search.click();

  expect(page.url()).toContain("/search?zip=80012&miles=5");
  const list = page.locator("#desktop-list>div");
  const resultsCount = await list.count();
  expect(resultsCount).toBeGreaterThanOrEqual(1);
});
