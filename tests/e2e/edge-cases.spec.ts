import { test, expect } from '@playwright/test';

const MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions';

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
    await page.route(MISTRAL_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          choices: [{ message: { content: 'Nous vous recommandons une aventure unique et inoubliable.' } }],
        }),
      });
    });

    await completeQuiz(page);

    await expect(page.getByText(/aventure unique/i)).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole('link', { name: /Explorer cette destination/i })).not.toBeVisible();
    await expect(page.getByRole('button', { name: /Recommencer/i })).toBeVisible();
  });

  test('quiz — erreur Mistral 500 affiche le message de fallback', async ({ page }) => {
    await page.route(MISTRAL_URL, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await completeQuiz(page);

    await expect(page.getByText(/momentanément indisponible/i)).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole('button', { name: /Recommencer/i })).toBeVisible();
  });

  test("chatbot — erreur Mistral 500 affiche un message d'erreur visible", async ({ page }) => {
    await page.route(MISTRAL_URL, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
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
