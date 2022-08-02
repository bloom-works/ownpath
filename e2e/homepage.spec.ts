import { test, expect } from "@playwright/test";

const baseURL = process.env.URL || "http://localhost:3001";
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test("Homepage has a banner with two working links back home and to the BHA website", async ({
  page,
}) => {
  await expect(page).toHaveTitle(/OwnPath/);
  const bha = "https://bha.colorado.gov/";
  const homeAnchor = page.locator("data-testid=homeLink");
  const bhaAnchor = page.locator("data-testid=bhaLink");
  await homeAnchor.click();
  await expect(page).toHaveURL(baseURL);
  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('a[target="_blank"]'),
  ]);
  await newPage.waitForLoadState();
  await bhaAnchor.click();
  await expect(newPage).toHaveURL(bha);
});

test('Homepage has "Try our guided experience" button that leads to the guided-search page', async ({
  page,
}) => {
  await expect(page).toHaveTitle(/OwnPath/);
  const guidedExperience = page.locator("text=Try our guided experience");
  await expect(guidedExperience).toHaveAttribute("href", "/guided-search");
  await guidedExperience.click();
  await expect(page.url()).toContain("/guided-search");
});

test('Homepage has "Search" button throws an error if provided an invalid zip code', async ({
  page,
}) => {
  await expect(page).toHaveTitle(/OwnPath/);
  const zip = "29410";
  const searchButton = page.locator("data-testid=submitButton");
  const searchInput = page.locator("data-testid=textInput");
  await searchInput.fill(zip);
  await expect(searchInput).toHaveValue(zip);
  await searchButton.click();
  const errorMsg = page.locator("data-testid=errorMessage");
  await expect(errorMsg).toContainText(
    "Please enter a valid Colorado zip code"
  );
});

test('Homepage has "Search" button that leads to the correct page when given a valid zip code page', async ({
  page,
}) => {
  await expect(page).toHaveTitle(/OwnPath/);
  const zip = "80014";
  const searchButton = page.locator("data-testid=submitButton");
  const searchInput = page.locator("data-testid=textInput");
  await searchInput.fill(zip);
  await expect(searchInput).toHaveValue(zip);
  await searchButton.click();
  await expect(page.url()).toContain(`/search?zip=${zip}&miles=5`);
});