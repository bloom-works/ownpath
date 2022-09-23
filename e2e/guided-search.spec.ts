import { test, expect } from "@playwright/test";

const baseURL = process.env.URL || "http://localhost:3000";
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test("Guided search experience works", async ({ page }) => {
  const guidedExperience = page.locator("a:visible", {
    hasText: "Try our guided experience",
  });
  await expect(guidedExperience).toHaveAttribute("href", "/guided-search");
  await guidedExperience.click();
  await expect(page.url()).toContain("/guided-search");

  const progress = page.locator("h1", { hasText: "Question" });
  const question = page.locator("legend");
  const checkboxes = page.locator(".usa-checkbox input");
  const radioButtons = page.locator(".usa-radio input");
  const firstRadio = radioButtons.nth(0);
  const next = page.locator("button", { hasText: "Next question" });
  const back = page.locator("button", { hasText: "Previous question" });

  // who is getting help
  await expect(progress).toHaveCount(1);
  await expect(progress).toContainText("1 of");
  await expect(question).toHaveCount(1);
  await expect(checkboxes).toHaveCount(0);
  await expect(radioButtons).toHaveCount(2);
  await expect(firstRadio).toBeChecked();
  await expect(next).toHaveCount(1);
  await expect(back).toHaveCount(0);
  await next.click();

  // age
  await expect(progress).toContainText("2 of");
  await expect(question).toContainText("age range");
  await expect(firstRadio).toBeChecked({ checked: false });
  await expect(checkboxes).toHaveCount(0);
  const olderAdultRadio = page.locator("input[value=older_adult]");
  await olderAdultRadio.dispatchEvent("click");
  await expect(next).toHaveCount(1);
  await expect(back).toHaveCount(1);
  await next.click();

  // type of help
  await expect(progress).toContainText("3 of");
  await expect(question).toContainText("type of help");
  await expect(next).toHaveCount(1);
  await expect(back).toHaveCount(1);
  await expect(radioButtons).toHaveCount(0);
  await expect(checkboxes).not.toHaveCount(0);
  const crisisContentBox = page.locator("#crisis-content-box");
  const suicidalIdeationCheckbox = page.locator(
    "input[value=suicidal_ideation]"
  );
  await expect(crisisContentBox).toHaveCount(0);
  await expect(suicidalIdeationCheckbox).toHaveCount(1);
  await expect(suicidalIdeationCheckbox).not.toBeChecked();
  await suicidalIdeationCheckbox.dispatchEvent("click");
  await expect(crisisContentBox).toHaveCount(1);
  await expect(suicidalIdeationCheckbox).toBeChecked();
  await next.click();

  // language
  await expect(progress).toContainText("4 of");
  await expect(next).toHaveCount(1);
  await expect(back).toHaveCount(1);
  await expect(radioButtons).toHaveCount(0);
  await expect(checkboxes).not.toHaveCount(0);
  await next.click();

  // zip
  await expect(next).toHaveCount(1);
  await expect(back).toHaveCount(1);
  await expect(question).toContainText("Where");
  await expect(radioButtons).toHaveCount(0);
  await expect(checkboxes).toHaveCount(0);
  const zipInput = page.locator("#zip");
  const zipError = page.locator(".usa-error-message");
  await expect(zipInput).toHaveCount(1);
  await expect(zipError).toHaveCount(0);
  await zipInput.fill("11111");
  await next.click();
  await expect(zipError).toHaveCount(1);
  await zipInput.fill("80203");
  await next.click();

  // distance
  await expect(question).toContainText("How far");
  await expect(radioButtons).not.toHaveCount(0);
  await expect(checkboxes).toHaveCount(0);
  await next.click();

  // results
  const header = page.locator("h1");
  await expect(header).toContainText("results near 80203");
  await expect(olderAdultRadio).toBeChecked();
  const activeFilters = page.locator("#active-filters-section");
  await expect(activeFilters).toHaveCount(1);
  await expect(activeFilters).toContainText("65+");
  const mapPins = page.locator(".map-marker-pin");
  await expect(mapPins).not.toHaveCount(0);
});
