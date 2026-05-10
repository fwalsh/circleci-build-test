import { test, expect } from '@playwright/test';

test('about page renders and links back to project-a', async ({ page }) => {
  await page.goto('http://localhost:3000/project-b/');

  await expect(page.locator('.about-card h1')).toContainText(/about/i);
  await expect(page.locator('.about-card a[href*="project-a"]').first()).toBeVisible();
});
