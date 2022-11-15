import { test, expect } from "@playwright/test";
import CARE_PROVIDER_DATA from "../src/data/ladders_data.json";

const baseURL = process.env.URL || "http://localhost:3000";
test.beforeEach(async ({ page }) => {
  await page.goto(
    `${baseURL}/compare?id=${CARE_PROVIDER_DATA[0].id}&id=${CARE_PROVIDER_DATA[1].id}`
  );
});

test("Compare displays all expected elements", async ({ page }) => {
  const map = page.locator(".leaflet-container");
  const getDirectionsLink = page.locator("a", { hasText: "Get directions" });
  const hoursOfOperationTable = page.locator("h3", {
    hasText: "Hours of operation",
  });
  const paymentTypesAccepted = page.locator("h3", {
    hasText: "Payment types accepted",
  });
  const services = page.locator("h2", { hasText: /Services$/ });
  const substanceUse = page.locator("h3", {
    hasText: "Substance use (drug) treatment services",
  });
  const mentalHealth = page.locator("h3", {
    hasText: "Mental health services",
  });
  const details = page.locator("h2", { hasText: "Details" });

  expect(await map.count()).toEqual(1);
  expect(await getDirectionsLink.count()).toEqual(2);
  expect(await hoursOfOperationTable.count()).toEqual(1);
  expect(await paymentTypesAccepted.count()).toEqual(1);
  expect(await services.count()).toEqual(1);
  expect(await substanceUse.count()).toEqual(1);
  expect(await mentalHealth.count()).toEqual(1);
  expect(await details.count()).toEqual(1);
});
