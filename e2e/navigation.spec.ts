import { expect, test } from '@playwright/test';

test('shows the home page and navigates to the schedule', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Akademia Aikido Gdańsk' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Grafik zajęć' }).click();

  await expect(
    page.getByRole('heading', { name: 'Grafik zajęć' }),
  ).toBeVisible();
  await expect(page.getByText('Dorośli/Młodzież Początkujący')).toBeVisible();
});

test('"Nowy w Aikido?" button on the schedule page has a readable label', async ({ page }) => {
  await page.goto('/#/schedule');
  const button = page.getByRole('button', { name: 'Dowiedz się więcej' });

  // The label used to be a blue link on a blue button, i.e. invisible.
  await expect(button).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(button).toHaveCSS('background-color', 'rgb(22, 119, 255)');
  await button.click();
  await expect(page.getByRole('heading', { name: 'Pierwsze zajęcia' })).toBeVisible();
});

test('navigates to the contact page from the footer', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Skontaktuj się z nami' }).click();

  await expect(page.getByRole('heading', { name: 'Kontakt', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Formularz kontaktowy' })).toBeVisible();
});
