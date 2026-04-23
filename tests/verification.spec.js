import { test, expect } from '@playwright/test';

test('verify hero section modifications', async ({ page, context }) => {
  // Clear all cookies and cache for this context
  await context.clearCookies();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Dump HTML source to see what's actually there
  const content = await page.content();
  console.log("--- PAGE CONTENT START ---");
  console.log(content.substring(0, 5000)); // First 5k chars
  console.log("--- PAGE CONTENT END ---");

  // Capture screenshot
  await page.screenshot({ path: 'test-results/landing.png', fullPage: true });

  // 1. Check if Hero is present
  const hero = page.locator('#home');
  await expect(hero).toBeVisible();

  // 2. Check for the professional bio text
  const bioText = page.getByText('Engineering systems where technical precision meets creative exploration');
  await expect(bioText).toBeVisible();

  // 3. Verify the "// Introduction" line is REMOVED
  const introHeader = page.getByText('// Introduction');
  await expect(introHeader).not.toBeVisible();
});
