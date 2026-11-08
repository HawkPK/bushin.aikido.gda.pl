import { expect, test } from '@playwright/test';

const WEB3FORMS = 'https://api.web3forms.com/submit';

test('signs up for the first training from the home page', async ({ page }) => {
  let payload: Record<string, unknown> | undefined;
  await page.route(WEB3FORMS, async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ json: { success: true, message: 'Email sent successfully!' } });
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Umów darmowy pierwszy trening' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText('Zapisz się na darmowy pierwszy trening')).toBeVisible();

  // Empty submit shows validation errors and sends nothing.
  await dialog.getByRole('button', { name: 'Wyślij zgłoszenie' }).click();
  await expect(dialog.getByText('Wybierz grupę.')).toBeVisible();
  await expect(dialog.getByText('Zgoda jest wymagana.')).toBeVisible();
  expect(payload).toBeUndefined();

  await dialog.getByText('Dzieci (7 lat i starsze)').click();
  await expect(dialog.getByLabel('Imię i nazwisko rodzica')).toBeVisible();
  await dialog.locator('.signup-dates label').first().click();
  await dialog.getByLabel('Imię i nazwisko rodzica').fill('Anna Kowalska');
  await dialog.getByLabel('Wiek dziecka').fill('8');
  await dialog.getByLabel('Telefon').fill('500 600 700');
  await dialog.getByRole('checkbox').check();
  await dialog.getByRole('button', { name: 'Wyślij zgłoszenie' }).click();

  await expect(dialog.getByText('Dziękujemy, zgłoszenie wysłane!')).toBeVisible();
  expect(payload).toMatchObject({
    Rodzic: 'Anna Kowalska',
    'Wiek dziecka': 8,
    Telefon: '500 600 700',
    botcheck: '',
  });
  expect(String(payload?.['Grupa'])).toContain('Dzieci (7 lat i starsze)');
  expect(String(payload?.['Termin'])).toMatch(/^(wt|czw) \d\d\.\d\d, 18:20$/);
});

test('shows club contacts when sending fails', async ({ page }) => {
  await page.route(WEB3FORMS, (route) => route.fulfill({ status: 500, json: { success: false } }));

  await page.goto('/#/first-class');
  await page.getByRole('button', { name: 'Zapisz się na trening próbny' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByText('Dorośli/Młodzież Początkujący').click();
  await dialog.getByLabel('Imię i nazwisko').fill('Jan Nowak');
  await dialog.getByLabel('E-mail').fill('jan@example.com');
  await dialog.getByRole('checkbox').check();
  await dialog.getByRole('button', { name: 'Wyślij zgłoszenie' }).click();

  await expect(dialog.getByText('Nie udało się wysłać')).toBeVisible();
  await expect(dialog.getByText('+48 518 580 292')).toBeVisible();
});
