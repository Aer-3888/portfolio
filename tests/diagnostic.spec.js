import { test, expect } from '@playwright/test';

test('diagnostic test', async ({ page }) => {
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  await page.goto('http://localhost:5173/');

  // Wait for some time to let React render and components like LiquidBackground to initialize
  await page.waitForTimeout(3000);

  console.log('--- Captured Console Errors ---');
  if (consoleErrors.length > 0) {
    consoleErrors.forEach(err => console.error(err));
  } else {
    console.log('No console errors detected.');
  }
  console.log('-------------------------------');

  // Verify if #home, #about, and #projects are present
  const home = await page.$('#home');
  const about = await page.$('#about');
  const projects = await page.$('#projects');

  console.log(`Section #home: ${home ? 'Present' : 'Missing'}`);
  console.log(`Section #about: ${about ? 'Present' : 'Missing'}`);
  console.log(`Section #projects: ${projects ? 'Present' : 'Missing'}`);

  // Check for elements covering the screen
  const viewportSize = page.viewportSize();
  if (viewportSize) {
    const centerX = viewportSize.width / 2;
    const centerY = viewportSize.height / 2;
    
    const elementAtCenter = await page.evaluateHandle(({ x, y }) => {
      return document.elementFromPoint(x, y);
    }, { x: centerX, y: centerY });

    const elementInfo = await elementAtCenter.evaluate(el => {
      if (!el) return 'None';
      return {
        tagName: el.tagName,
        id: el.id,
        className: el.className,
        style: el.getAttribute('style'),
        rect: el.getBoundingClientRect()
      };
    });

    console.log('Element at center of viewport:', JSON.stringify(elementInfo, null, 2));
    
    // Check if any element has very high z-index and covers large area
    const coveringElements = await page.evaluate(() => {
      const results = [];
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (
          rect.width >= window.innerWidth * 0.9 &&
          rect.height >= window.innerHeight * 0.9 &&
          style.pointerEvents !== 'none' &&
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          el.tagName !== 'BODY' &&
          el.tagName !== 'HTML' &&
          el.id !== 'root'
        ) {
          results.push({
            tagName: el.tagName,
            id: el.id,
            className: el.className,
            zIndex: style.zIndex,
            opacity: style.opacity
          });
        }
      }
      return results;
    });

    if (coveringElements.length > 0) {
      console.log('Potential interaction-blocking elements:', JSON.stringify(coveringElements, null, 2));
    } else {
      console.log('No suspicious full-screen covering elements found.');
    }
  }

  expect(home).not.toBeNull();
  expect(about).not.toBeNull();
  expect(projects).not.toBeNull();
});
