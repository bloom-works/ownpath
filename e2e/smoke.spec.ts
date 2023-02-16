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

  await page.locator("input[name=zip]:visible").fill("80012");
  await search.click();
  await page.waitForTimeout(2000); // wait for search to finish
  // TODO: create loading state for search result page

  expect(page.url()).toContain("/search?zip=80012&miles=5");
  const list = page.locator("#desktop-list>div");
  const resultsCount = await list.count();
  expect(resultsCount).toBeGreaterThanOrEqual(1);
});
