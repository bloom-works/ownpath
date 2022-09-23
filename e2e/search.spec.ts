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
  await expect(page.url()).toContain("/result/");
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
  const applyFilterButton = page.locator("button", {
    hasText: "Apply filters",
  });
  const radios = page.locator("input:visible[name=distance]");
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
  await applyFilterButton.click();
  await expect(page.url()).toContain("miles=10");
});

test("Distance filter works on desktop", async ({ page }) => {
  const distanceFilterToggle = page.locator("button", { hasText: "Distance" });
  const radios = page.locator("input:visible[name=distance]");
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
  await expect(page.url()).toContain("hours=monday");
  await expect(page.url()).toContain("hours=tuesday");
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
  await expect(page.url()).not.toContain("hours=monday");
  await expect(page.url()).toContain("hours=tuesday");
  await expect(activeFilters).not.toContainText("Monday");
  await expect(activeFilters).toContainText("Tuesday");

  const clearAll = page.locator("#active-filters-section button", {
    hasText: "Clear",
  });
  await clearAll.dispatchEvent("click");
  await daysFilterToggle.click();
  await expect(monday).not.toBeChecked();
  await expect(tuesday).not.toBeChecked();
  await expect(page.url()).not.toContain("hours=monday");
  await expect(page.url()).not.toContain("hours=tuesday");
  await expect(activeFilters).toHaveCount(0);
});

test("Clearable checkbox filter works on mobile", async ({ page }) => {
  await page.setViewportSize({
    width: 320,
    height: 640,
  });
  const filterToggle = page.locator("button", { hasText: "Filter results" });
  const applyFilterButton = page.locator("button", {
    hasText: "Apply filters",
  });
  const clearFilterButton = page.locator("#mobile-filter-container button", {
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
  await applyFilterButton.click();
  await expect(page.url()).toContain("hours=monday");
  await expect(page.url()).toContain("hours=tuesday");

  await filterToggle.click();
  await clearFilterButton.click();
  await expect(page.url()).not.toContain("hours=monday");
  await expect(page.url()).not.toContain("hours=tuesday");
});
