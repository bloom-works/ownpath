import { test, expect } from "@playwright/test";

const baseURL = process.env.URL || "http://localhost:3000";
test.beforeEach(async ({ page }) => {
  await page.goto(`${baseURL}/search?zip=80203&miles=5`);
});

test("Search displays results", async ({ page }) => {
  const header = page.locator("h1");
  const mapContainer = page.locator(".leaflet-container");
  const mapPins = page.locator(".map-marker-pin");
  const resultDistances = page.locator("text=miles away");
  const detailButtons = page.locator("a", {
    hasText: "Full detail",
  });
  await expect(header).toContainText("results near 80203");
  await expect(mapContainer).toHaveCount(2);
  await expect(mapPins).not.toHaveCount(0);
  await expect(resultDistances).not.toHaveCount(0);
  await expect(detailButtons).not.toHaveCount(0);

  await detailButtons.nth(0).click();
  expect(page.url()).toContain("/result/");
});

test("Mobile has toggle-able result views", async ({ page }) => {
  const mapListToggle = page.locator(".usa-button-group:visible");
  const listButton = page.locator("button", { hasText: "List view" });
  const mapButton = page.locator("button", { hasText: "Map view" });
  const mapContainer = page.locator(".leaflet-container:visible");
  const detailButtons = page.locator("a:visible", {
    hasText: "Full detail",
  });

  await expect(mapListToggle).toHaveCount(0);
  await expect(mapContainer).toHaveCount(1);
  await expect(detailButtons).not.toHaveCount(0);

  await page.setViewportSize({
    width: 320,
    height: 640,
  });
  await expect(mapListToggle).toHaveCount(1);
  await expect(mapContainer).toHaveCount(0);
  await expect(detailButtons).not.toHaveCount(0);

  await mapButton.click();
  await expect(mapContainer).toHaveCount(1);
  await expect(detailButtons).toHaveCount(0);

  await listButton.click();
  await expect(mapContainer).toHaveCount(0);
  await expect(detailButtons).not.toHaveCount(0);
});

test("Distance filter works on mobile", async ({ page }) => {
  await page.setViewportSize({
    width: 320,
    height: 640,
  });
  const filterToggle = page.locator("button", { hasText: "Filter results" });
  const viewResultsButton = page.locator("button", {
    hasText: /.*View \d+ results.*/,
  });
  const radios = page.locator("input:visible[name*=distance]");
  const radioDefault = radios.nth(0);
  const radioBigger = radios.nth(1);
  await expect(radios).toHaveCount(0);
  await filterToggle.click();
  await expect(radios).not.toHaveCount(0);
  await expect(radioDefault).toBeChecked();
  await expect(radioBigger).not.toBeChecked();
  await radioBigger.dispatchEvent("click");
  await expect(radioDefault).not.toBeChecked();
  await expect(radioBigger).toBeChecked();
  await viewResultsButton.click();
  await expect(page.url()).toContain("miles=10");
});

test("Distance filter works on desktop", async ({ page }) => {
  const distanceFilterToggle = page.locator("button", { hasText: /Distance/ });
  const radios = page.locator("input:visible[name*=distance]");
  const radioDefault = radios.nth(0);
  const radioBigger = radios.nth(1);
  const activeFilters = page.locator("#active-filters-section");

  await expect(radios).toHaveCount(0);
  await distanceFilterToggle.click();
  await expect(radios).not.toHaveCount(0);
  await expect(radioDefault).toBeChecked();
  await expect(radioBigger).not.toBeChecked();
  await radioBigger.dispatchEvent("click");
  await expect(radioDefault).not.toBeChecked();
  await expect(radioBigger).toBeChecked();
  await expect(page.url()).toContain("miles=10");
  await expect(activeFilters).toHaveCount(0);
});

test("Clearable checkbox filter works on desktop", async ({ page }) => {
  const daysFilterToggle = page.locator("button", { hasText: "Days" });
  const checkboxes = page.locator("input:visible[name=hours]");
  const monday = page.locator("input:visible[value=monday]");
  const tuesday = page.locator("input:visible[value=tuesday]");
  const activeFilters = page.locator("#active-filters-section");
  await expect(checkboxes).toHaveCount(0);
  await expect(activeFilters).toHaveCount(0);

  await daysFilterToggle.click();
  await expect(checkboxes).toHaveCount(7);
  await expect(monday).not.toBeChecked();
  await expect(tuesday).not.toBeChecked();

  await monday.dispatchEvent("click");
  await tuesday.dispatchEvent("click");
  await expect(monday).toBeChecked();
  await expect(tuesday).toBeChecked();
  expect(page.url()).toContain("hours=monday");
  expect(page.url()).toContain("hours=tuesday");
  await expect(activeFilters).toHaveCount(1);
  await expect(activeFilters).toContainText("Monday");
  await expect(activeFilters).toContainText("Tuesday");

  const clearMonday = page.locator("#active-filters-section button", {
    hasText: "Monday",
  });
  await clearMonday.dispatchEvent("click");
  await daysFilterToggle.click();
  await expect(monday).not.toBeChecked();
  await expect(tuesday).toBeChecked();
  expect(page.url()).not.toContain("hours=monday");
  expect(page.url()).toContain("hours=tuesday");
  await expect(activeFilters).not.toContainText("Monday");
  await expect(activeFilters).toContainText("Tuesday");

  const clearAll = page.locator("#active-filters-section button", {
    hasText: "Clear all filters",
  });
  await clearAll.dispatchEvent("click");
  await daysFilterToggle.click();
  await expect(monday).not.toBeChecked();
  await expect(tuesday).not.toBeChecked();
  expect(page.url()).not.toContain("hours=monday");
  expect(page.url()).not.toContain("hours=tuesday");
  await expect(activeFilters).toHaveCount(0);
});

test("Clearable checkbox filter works on mobile", async ({ page }) => {
  await page.setViewportSize({
    width: 320,
    height: 640,
  });
  const filterToggle = page.locator("button", { hasText: "Filter results" });
  const viewResultsButton = page.locator("button", {
    hasText: /.*View \d+ results.*/,
  });
  const clearFilterButton = page.locator("#mobile-filter-menu button", {
    hasText: "Clear all filters",
  });
  const checkboxes = page.locator("input:visible[name=hours]");
  const monday = page.locator("input:visible[value=monday]");
  const tuesday = page.locator("input:visible[value=tuesday]");

  await filterToggle.click();
  await expect(checkboxes).toHaveCount(7);
  await expect(monday).not.toBeChecked();
  await expect(tuesday).not.toBeChecked();

  await monday.dispatchEvent("click");
  await tuesday.dispatchEvent("click");
  await expect(monday).toBeChecked();
  await expect(tuesday).toBeChecked();
  await viewResultsButton.click();
  expect(page.url()).toContain("hours=monday");
  expect(page.url()).toContain("hours=tuesday");

  await filterToggle.click();
  await clearFilterButton.click();
  expect(page.url()).not.toContain("hours=monday");
  expect(page.url()).not.toContain("hours=tuesday");
});

test("Compare selection works", async ({ page }) => {
  const resultA = page.locator(".result-card").nth(0);

  const checkboxA = resultA.nth(0).locator("text=Compare provider");
  const checkboxB = page
    .locator(".result-card")
    .nth(1)
    .locator("text=Compare provider");
  const checkboxC = page
    .locator(".result-card")
    .nth(2)
    .locator("text=Compare provider");

  const compareButton = page.locator("button", {
    hasText: "Compare providers",
  });
  const compareLink = page.locator("a", {
    hasText: "Compare providers",
  });

  // Before any providers are selected for compare,
  // the compare selection UI component is not present
  expect(await compareButton.count()).toEqual(0);

  // Selecting a single provider for compare reveals
  // compare selection UI with disabled button and no navigation link;
  // other provider checkboxes remain clickable in results
  await checkboxA.click();
  expect(await compareLink.count()).toEqual(0);
  expect(await compareButton.isDisabled()).toBeTruthy();
  expect(await checkboxC.isDisabled()).not.toBeTruthy();

  // Selecting a second provider for compare replaces the
  // disabled compare button with navigation linkl other
  // provider checkboxes are disabled in results
  await checkboxB.click();
  expect(await compareLink.getAttribute("href")).toContain("/compare");
  expect(await compareButton.count()).toEqual(0);
  expect(await checkboxC.isDisabled()).toBeTruthy();

  // Un-selecting a provider for compare returns compare selection UI to:
  // disabled button, no link; clickable checkboxes in results
  await checkboxA.click();
  expect(await compareLink.count()).toEqual(0);
  expect(await compareButton.isDisabled()).toBeTruthy();
  expect(await checkboxC.isDisabled()).not.toBeTruthy();

  const nameA = await resultA.locator("h2").innerText();
  const clearA = page.locator("button", { hasText: `Clear ${nameA}` });
  const clearAll = page.locator("button", { hasText: /Clear$/ });

  // Selecting second provider returns compare selection UI to:
  // no button; navigation link; disabled checkboxes in results
  await checkboxA.click();
  expect(await compareLink.getAttribute("href")).toContain("/compare");
  expect(await compareButton.count()).toEqual(0);
  expect(await checkboxC.isDisabled()).toBeTruthy();

  // Clicking clear button for one provider returns compare selection UI to:
  // disabled button, no link; clickable checkboxes in results
  await clearA.click();
  expect(await compareLink.count()).toEqual(0);
  expect(await compareButton.isDisabled()).toBeTruthy();
  expect(await checkboxC.isDisabled()).not.toBeTruthy();

  // Clicking clear all button removes compare selection UI from view
  await clearAll.click();
  expect(await compareButton.count()).toEqual(0);
});

test("Survey prompt displays after event threshold met", async ({ page }) => {
  const surveyPrompt = page.locator("a", {
    hasText: /Take a short survey/,
  });

  // trigger events:
  // - Update filter
  const daysFilters = page.locator("button", { hasText: /Days/ });
  const monday = page.locator("input:visible[value=monday]");
  // - Paginate
  const pageNextButton = page.locator("button", { hasText: /Next/ });

  // Threshold is 2 events; then survey prompt should become visible
  expect(await surveyPrompt.isVisible()).toBeFalsy();
  await daysFilters.click();
  await monday.dispatchEvent("click");
  expect(await surveyPrompt.isVisible()).toBeFalsy();
  await pageNextButton.click();
  page.waitForTimeout(100);
  expect(await surveyPrompt.isVisible()).toBeTruthy();
});
