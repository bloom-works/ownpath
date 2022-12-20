import { test, expect } from "@playwright/test";
import CARE_PROVIDER_DATA from "../src/data/ladders_data.json";

const baseURL = process.env.URL || "http://localhost:3000";
test.beforeEach(async ({ page }) => {
  await page.goto(`${baseURL}/result/${CARE_PROVIDER_DATA[0].id}`);
});

test("Result displays all expected elements", async ({ page }) => {
  const map = page.locator(".leaflet-container");
  const getDirectionsLink = page.locator("a", { hasText: "Get directions" });

  expect(await map.count()).toEqual(1);
  expect(await getDirectionsLink.count()).toEqual(1);
});
