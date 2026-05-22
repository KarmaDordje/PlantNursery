import { test, expect } from '@playwright/test';

test.describe('Cross-browser Web App Verification', () => {
  
  test('should load the homepage correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/Wojtek Kotyrba | Szkółka Drzew i Krzewów Ozdobnych/);
    
    // Check for major landmarks
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Szkółka');
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should navigate to the catalog', async ({ page }) => {
    await page.goto('/');
    
    // Find and click the "Zobacz Katalog" link
    const katalogLink = page.getByRole('link', { name: 'Zobacz Katalog' });
    await katalogLink.click();
    
    await expect(page).toHaveURL(/\/katalog/);
    
    // Verify catalog headings (H2 based on our refactor)
    const h2 = page.locator('h2').first();
    await expect(h2).toBeVisible();
  });

  test('should have correct footer link dimensions (Tap Target)', async ({ page }) => {
    await page.goto('/');
    
    const telLink = page.locator('footer a[href^="tel"]');
    const box = await telLink.boundingBox();
    
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should check for hero image loading', async ({ page }) => {
    await page.goto('/');
    
    const heroImage = page.locator('img[alt="Macro leaf texture"]');
    await expect(heroImage).toBeVisible();
    
    // Verify it's using the new .jpg extension we fixed
    const src = await heroImage.getAttribute('src');
    expect(src).toContain('.jpg');
  });

});
