import { test, expect } from '@playwright/test';

const MISTRAL_MOCK = {
  choices: [
    {
      message: {
        content: 'Paris 1889 est la destination idéale pour votre profil. La Belle Époque vous offrira une immersion culturelle incomparable dans le Paris de l\'Exposition Universelle.',
      },
    },
  ],
};

test.describe('Quiz de recommandation', () => {
  test.beforeEach(async ({ page }) => {
    // Intercepter toute requête vers l'API Mistral — aucun appel réseau externe
    await page.route('**/api.mistral.ai/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MISTRAL_MOCK),
      });
    });
  });

  test('quiz — ouverture via CTA hero', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Trouver ma destination/i }).click();

    await expect(page.getByText('Trouvez votre destination')).toBeVisible();
    await expect(page.getByText('Question 1 / 4')).toBeVisible();
  });

  test('quiz — progression step by step sur les 4 questions', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Trouver ma destination/i }).click();

    await expect(page.getByText('Question 1 / 4')).toBeVisible();
    await page.getByText('Culturelle et artistique').click();

    await expect(page.getByText('Question 2 / 4')).toBeVisible();
    await page.getByText('Histoire moderne').click();

    await expect(page.getByText('Question 3 / 4')).toBeVisible();
    await page.getByText("L'effervescence urbaine").click();

    await expect(page.getByText('Question 4 / 4')).toBeVisible();
    await page.getByText('Visiter des monuments').click();
  });

  test('quiz — résultat affiché avec destination recommandée', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Trouver ma destination/i }).click();

    await page.getByText('Culturelle et artistique').click();
    await page.getByText('Histoire moderne').click();
    await page.getByText("L'effervescence urbaine").click();
    await page.getByText('Visiter des monuments').click();

    await expect(page.getByText('Paris 1889 est la destination idéale')).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('link', { name: /Explorer cette destination/i })).toBeVisible();
  });

  test('quiz — recommencer réinitialise le quiz', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Trouver ma destination/i }).click();

    await page.getByText('Culturelle et artistique').click();
    await page.getByText('Histoire moderne').click();
    await page.getByText("L'effervescence urbaine").click();
    await page.getByText('Visiter des monuments').click();

    await expect(page.getByRole('button', { name: /Recommencer/i })).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: /Recommencer/i }).click();

    await expect(page.getByText('Question 1 / 4')).toBeVisible();
  });

  test('quiz — fermeture via croix', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Trouver ma destination/i }).click();

    await expect(page.getByText('Trouvez votre destination')).toBeVisible();
    await page.getByRole('button', { name: /Fermer/i }).click();

    await expect(page.getByText('Trouvez votre destination')).not.toBeVisible();
  });
});
