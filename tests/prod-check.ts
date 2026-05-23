import { chromium } from 'playwright';

const BASE = 'https://timetravelagency-kappa.vercel.app';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // 1. Accueil → clic Explorer Paris
  await page.goto(BASE);
  await page.waitForLoadState('networkidle');
  // Scroll vers les cartes pour simuler un vrai usage
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.locator('a[href="/destination/paris-1889"]').first().click();
  // Attendre que la destination page soit montée ET que useEffect scrollTo(0,0) ait tourné
  await page.waitForURL('**/destination/paris-1889');
  await page.waitForFunction(() => document.querySelector('h1') !== null);
  await page.waitForTimeout(400); // laisse l'animation + useEffect se terminer

  // 2. Vérifie qu'on est sur la bonne page
  const url = page.url();
  console.log('URL:', url);

  // 3. Vérifie que le h1 est visible dans le viewport
  const h1 = page.getByRole('heading', { level: 1 });
  const h1Text = await h1.textContent();
  console.log('H1:', h1Text?.trim());

  const box = await h1.boundingBox();
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log('scrollY:', scrollY, '| h1.top:', Math.round(box?.y ?? -1));
  console.log('H1 visible dans viewport:', (box?.y ?? 999) < 800 ? 'OUI' : 'NON');

  // 4. Vérifie la présence du wrapper Framer Motion (motion.div avec style transform)
  const hasMotionDiv = await page.evaluate(() => {
    const divs = document.querySelectorAll('main, [style*="transform"], [style*="opacity"]');
    return divs.length > 0;
  });
  console.log('Wrapper animation détecté:', hasMotionDiv ? 'OUI' : 'NON');

  await browser.close();
})();
