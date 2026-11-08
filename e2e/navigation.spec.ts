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

test('schedule lists instructors and who teaches each class', async ({ page }) => {
  await page.goto('/#/schedule');

  await expect(page.getByRole('heading', { name: 'Instruktorzy' })).toBeVisible();
  await expect(page.getByText('4 DAN Aikido · 1 DAN Judo')).toBeVisible();
  await expect(page.getByText('Piotr Pék', { exact: true })).toBeVisible();

  const tuesdayAdults = page.getByRole('row', { name: /Wtorek.*19:15.*Początkujący/ });
  await expect(tuesdayAdults).toContainText('Piotr Pék / Paweł Jastrząbek');
  await expect(page.getByRole('row', { name: /Czwartek.*19:15.*Zaawansowani/ })).toBeVisible();
  await expect(page.getByText('19:20')).toHaveCount(0);
});

test('navigates to the contact page from the footer', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Skontaktuj się z nami' }).click();

  await expect(page.getByRole('heading', { name: 'Kontakt', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Formularz kontaktowy' })).toBeVisible();
});
