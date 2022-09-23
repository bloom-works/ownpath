import { test, expect } from "@playwright/test";

const baseURL = process.env.URL || "http://localhost:3000";
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test("Homepage has working language menu", async ({ page }) => {
  const languageMenu = page.locator("#change-language");
  await expect(languageMenu).toHaveCount(1);

  await languageMenu.selectOption("es");
  await expect(page).toHaveTitle("Mi Propia Senda");

  await languageMenu.selectOption("en");
  await expect(page).toHaveTitle("OwnPath");
});

test("Homepage offers resources", async ({ page }) => {
  const resourceCards = page.locator(".usa-card");
  await expect(resourceCards).toHaveCount(3);

  const resourceLinks = page.locator(".usa-card .usa-card__footer .usa-link");
  await expect(resourceLinks).toHaveCount(3);

  const banner = page.locator("text=Need immediate help");
  await expect(banner).toHaveCount(1);
});

test("Homepage links to FAQ", async ({ page }) => {
  const faq = page.locator(".usa-footer a", {
    hasText: "Frequently Asked Questions",
  });
  await faq.click();
  expect(page.url()).toContain("/faq");
});

test("Homepage nav logos are clickable", async ({ page }) => {
  const logos = page.locator("header a", { has: page.locator("svg") });
  await expect(logos).toHaveCount(2);

  const ownpath = await logos.nth(0).getAttribute("href");
  expect(ownpath).toEqual("/");
  const bha = await logos.nth(1).getAttribute("href");
  expect(bha).toEqual("https://bha.colorado.gov/");
});

test("Homepage has feedback form", async ({ page }) => {
  const feedback = page.locator(".usa-footer a", {
    hasText: "Submit a suggestion",
  });
  await expect(feedback).toHaveCount(1);

  const feedbackUrl = await feedback.getAttribute("href");
  await expect(feedbackUrl).toContain("google.com/forms/");
});
