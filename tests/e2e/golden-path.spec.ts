import { test, expect } from '@playwright/test';

test.describe('Parcours principal', () => {
  test('accueil — hero visible et CTA fonctionnels', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Voyagez à travers');
    await expect(page.getByText('Découvrir les destinations')).toBeVisible();
    await expect(page.getByText('Parler à notre assistant')).toBeVisible();
  });

  test('accueil — les 3 destinations sont présentes dans le DOM', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('a[href="/destination/paris-1889"]')).toBeAttached();
    await expect(page.locator('a[href="/destination/cretace"]')).toBeAttached();
    await expect(page.locator('a[href="/destination/florence-1504"]')).toBeAttached();
  });

  test('navigation vers une page destination', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /Explorer/i }).first().click();

    await expect(page).toHaveURL(/\/destination\//);
    await expect(page.getByRole('link', { name: /Retour/i })).toBeVisible();
  });

  test('retour vers accueil depuis une page destination', async ({ page }) => {
    await page.goto('/destination/paris-1889');

    await page.getByRole('link', { name: /Retour/i }).click();

    await expect(page).toHaveURL('/');
  });

  test('chatbot — ouverture et fermeture via le bouton flottant', async ({ page }) => {
    await page.goto('/');

    const toggleBtn = page.getByRole('button', { name: /Ouvrir le chat/i });
    await toggleBtn.click();

    await expect(page.locator('#chatbot').getByText('Assistant IA', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: /Fermer/i }).click();
    await expect(page.locator('#chatbot').getByText('Assistant IA', { exact: true })).not.toBeVisible();
  });

  test('chatbot — ouverture via CTA page destination', async ({ page }) => {
    await page.goto('/destination/paris-1889');

    await page.getByRole('button', { name: /Parler à notre assistant/i }).click();

    await expect(page.locator('#chatbot').getByText('Assistant IA', { exact: true })).toBeVisible();
  });

  test('route inconnue — redirige vers accueil', async ({ page }) => {
    await page.goto('/destination/inexistant');

    await expect(page).toHaveURL('/');
  });
});
