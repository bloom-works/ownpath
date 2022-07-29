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
  await expect(page.url()).toContain("/guided-search");
});

const testingValues = {
  option: { value: "someone", text: "I am searching for myself" },
  ageRange: { value: "under_18", text: "Under 18" },
  help: {
    value: "court_mandated_treatment",
    text: "My court-mandated treatment",
  },
  language: { value: "Spanish", text: "Spanish / Español" },
  zip: { value: "80014" },
  miles: { value: "100", text: "Within 100 miles" },
};

test("Guided Search, yourself full cycle", async ({ page }) => {
  const { option, ageRange, help, language, zip, miles } = testingValues;
  await expect(page).toHaveTitle(/OwnPath/);
  const guidedExperience = page.locator("text=Try our guided experience");
  await expect(guidedExperience).toHaveAttribute("href", "/guided-search");
  await guidedExperience.click();
  await page.locator(`text=${option.text}`).check();
  expect(await page.locator(`text=${option.text}`).isChecked()).toBeTruthy();
  const nextQuestion = page.locator("data-testid=button");
  await nextQuestion.click();
  await page.locator(`text=${ageRange.text}`).check();
  expect(await page.locator(`text=${ageRange.text}`).isChecked()).toBeTruthy();
  await nextQuestion.click();
  await page.locator(`text=${help.text}`).check();
  expect(await page.locator(`text=${help.text}`).isChecked()).toBeTruthy();
  await nextQuestion.click();
  await page.locator(`text=${language.text}`).check();
  expect(await page.locator(`text=${language.text}`).isChecked()).toBeTruthy();
  await nextQuestion.click();
  await nextQuestion.click();
  const errorMsg = page.locator("data-testid=errorMessage");
  await expect(errorMsg).toContainText(
    "Please enter a valid Colorado zip code"
  );
  const searchInput = page.locator("data-testid=textInput");
  await searchInput.fill(zip.value);
  await expect(searchInput).toHaveValue(zip.value);
  nextQuestion.click();
  await page.locator(`text=${miles.text}`).check();
  expect(await page.locator(`text=${miles.text}`).isChecked()).toBeTruthy();
  nextQuestion.click();
  await expect(page).toHaveURL(
    `${baseURL}/search?zip=${zip.value}&miles=${miles.value}&typesOfHelp=${help.value}&languages=${language.value}&age=${ageRange.value}`
  );
});
