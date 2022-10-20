import { test, expect } from "@playwright/test";
import * as fs from "fs";

const baseURL = process.env.URL || "http://localhost:3000";
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL + "/faq");
});

test("FAQ page exists", async ({ page }) => {
  const header = page.locator("h1");
  await expect(header).toContainText("Frequently Asked Questions");
  const questions = page.locator(".usa-accordion__button");
  await expect(questions).not.toHaveCount(0);
});

test("questions expand and collapse", async ({ page }) => {
  const questions = page.locator(".usa-accordion__button");
  const firstQuestion = questions.nth(0);
  const visibleAnswers = page.locator(".usa-accordion__content:visible");
  await expect(visibleAnswers).toHaveCount(0);
  await firstQuestion.click();
  await expect(visibleAnswers).toHaveCount(1);
  await expect(visibleAnswers).toContainText("A. ");
  await firstQuestion.click();
  await expect(visibleAnswers).toHaveCount(0);
});

test("there are resources to download", async ({ page }) => {
  const resourcesQuestion = page.locator(".usa-accordion__button", {
    hasText: "OwnPath materials",
  });
  const visibleAnswers = page.locator(".usa-accordion__content:visible");
  const visibleResources = page.locator(".usa-accordion__content a:visible");
  await expect(resourcesQuestion).toHaveCount(1);
  await expect(visibleAnswers).toHaveCount(0);
  await resourcesQuestion.click();
  await expect(visibleAnswers).toContainText("Download");
  await expect(visibleResources).toHaveCount(4);
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    visibleResources.nth(0).click(),
  ]);
  const filePath = "test_resource.pdf";
  await download.saveAs(filePath);
  expect(fs.existsSync(filePath)).toBeTruthy();
  fs.unlinkSync(filePath);
});
