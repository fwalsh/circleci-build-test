import { test, expect } from '@playwright/test';

test('button reveals CircleCI status text on click', async ({ page }) => {
  await page.route('**/api/v2/status.json', route =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        page: { name: 'CircleCI', updated_at: '2026-05-09T00:00:00Z' },
        status: { description: 'All Systems Operational', indicator: 'none' },
      }),
    })
  );

  await page.goto('http://localhost:3000/project-a/');

  const reveal = page.locator('[data-testid="status-reveal"]');
  await expect(reveal).toBeHidden();

  await page.click('[data-testid="check-status-btn"]');

  await expect(reveal).toBeVisible();
  await expect(reveal).toContainText('All Systems Operational');
});
