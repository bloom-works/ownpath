import { test, expect } from "@playwright/test";

const baseURL = process.env.URL || "http://localhost:3000";
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test('Homepage has "Try our guided experience" button that leads to the guided-search page', async ({
  page,
}) => {
  await expect(page).toHaveTitle(/OwnPath/);
  const guidedExperience = page.locator("text=Try our guided experience");
  await expect(guidedExperience).toHaveAttribute("href", "/guided-search");
  await guidedExperience.click();
  expect(page.url()).toContain("/guided-search");
});
