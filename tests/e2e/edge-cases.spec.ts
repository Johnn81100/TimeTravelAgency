import { test, expect } from '@playwright/test';

const PROXY_URL = '**/api/chat';

async function completeQuiz(page: Parameters<Parameters<typeof test>[1]>[0]) {
  await page.goto('/');
  await page.getByRole('button', { name: /Trouver ma destination/i }).click();
  await expect(page.getByText('Trouvez votre destination')).toBeVisible();
  await page.getByText('Culturelle et artistique').click();
  await expect(page.getByText('Question 2 / 4')).toBeVisible();
  await page.getByText('Histoire moderne').click();
  await expect(page.getByText('Question 3 / 4')).toBeVisible();
  await page.getByText("L'effervescence urbaine").click();
  await expect(page.getByText('Question 4 / 4')).toBeVisible();
  await page.getByText('Visiter des monuments').click();
}

test.describe('Cas limites', () => {
  test('quiz — destination non reconnue affiche le texte sans lien Explorer', async ({ page }) => {
    await page.route(PROXY_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ content: 'Nous vous recommandons une aventure unique et inoubliable.' }),
      });
    });

    await completeQuiz(page);

    await expect(page.getByText(/aventure unique/i)).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole('link', { name: /Explorer cette destination/i })).not.toBeVisible();
    await expect(page.getByRole('button', { name: /Recommencer/i })).toBeVisible();
  });

  test('quiz — erreur Mistral 500 affiche le message de fallback', async ({ page }) => {
    await page.route(PROXY_URL, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Mistral 500: Internal Server Error' }),
      });
    });

    await completeQuiz(page);

    await expect(page.getByText(/momentanément indisponible/i)).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole('button', { name: /Recommencer/i })).toBeVisible();
  });

  test("chatbot — erreur Mistral 500 affiche un message d'erreur visible", async ({ page }) => {
    await page.route(PROXY_URL, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Mistral 500: Internal Server Error' }),
      });
    });

    await page.goto('/');
    await page.getByRole('button', { name: /Ouvrir le chat/i }).click();
    await expect(page.locator('#chatbot').getByText('Assistant IA', { exact: true })).toBeVisible();
    const input = page.getByPlaceholder('Posez votre question...');
    await input.fill('Bonjour');
    await input.press('Enter');

    await expect(page.getByText(/Mistral 500/i)).toBeVisible({ timeout: 8000 });
  });
});

test.describe('Chatbot — saisie', () => {
  test('chatbot — bouton envoi désactivé si message vide', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Ouvrir le chat/i }).click();
    await expect(page.locator('#chatbot').getByText('Assistant IA', { exact: true })).toBeVisible();

    const submit = page.locator('#chatbot button[type="submit"]');
    await expect(submit).toBeDisabled();

    await page.getByPlaceholder('Posez votre question...').fill('Bonjour');
    await expect(submit).toBeEnabled();

    await page.getByPlaceholder('Posez votre question...').clear();
    await expect(submit).toBeDisabled();
  });
});

test.describe('Quiz — abandon', () => {
  test('quiz — fermeture à la question 2 réinitialise le modal', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Trouver ma destination/i }).click();
    await expect(page.getByText('Trouvez votre destination')).toBeVisible();
    await page.getByText('Culturelle et artistique').click();
    await expect(page.getByText('Question 2 / 4')).toBeVisible();

    await page.getByRole('button', { name: /Fermer/i }).click();
    await expect(page.getByText('Trouvez votre destination')).not.toBeVisible();
  });

  test('quiz — fermeture à la question 3 réinitialise le modal', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Trouver ma destination/i }).click();
    await expect(page.getByText('Trouvez votre destination')).toBeVisible();
    await page.getByText('Culturelle et artistique').click();
    await expect(page.getByText('Question 2 / 4')).toBeVisible();
    await page.getByText('Histoire moderne').click();
    await expect(page.getByText('Question 3 / 4')).toBeVisible();

    await page.getByRole('button', { name: /Fermer/i }).click();
    await expect(page.getByText('Trouvez votre destination')).not.toBeVisible();
  });
});

test.describe('Responsive — header', () => {
  test('mobile — hamburger visible, nav desktop masquée', async ({ page }) => {
    const viewport = page.viewportSize();
    if (!viewport || viewport.width >= 768) test.skip();

    await page.goto('/');
    await expect(page.getByRole('button', { name: /Ouvrir le menu/i })).toBeVisible();
    await expect(page.locator('nav.hidden')).not.toBeVisible();
  });

  test('mobile — hamburger ouvre et ferme le menu', async ({ page }) => {
    const viewport = page.viewportSize();
    if (!viewport || viewport.width >= 768) test.skip();

    await page.goto('/');
    await page.getByRole('button', { name: /Ouvrir le menu/i }).click();
    await expect(page.getByRole('button', { name: /Fermer le menu/i })).toBeVisible();

    // Les liens du menu mobile sont visibles
    const mobileNav = page.locator('header div.md\\:hidden nav');
    await expect(mobileNav.getByRole('link', { name: 'Destinations' })).toBeVisible();

    await page.getByRole('button', { name: /Fermer le menu/i }).click();
    await expect(mobileNav).not.toBeVisible();
  });

  test('desktop — nav principale visible, hamburger masqué', async ({ page }) => {
    const viewport = page.viewportSize();
    if (!viewport || viewport.width < 768) test.skip();

    await page.goto('/');
    await expect(page.locator('header nav').filter({ hasText: 'Destinations' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Ouvrir le menu/i })).not.toBeVisible();
  });
});
