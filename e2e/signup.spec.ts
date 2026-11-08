import { expect, test } from '@playwright/test';

// The online signup form is switched off (SIGNUP_FORM_ENABLED in SignupModal.tsx);
// the signup buttons open a popup with the club contacts and class times instead.

test('home page signup button shows club contacts and class times', async ({ page }) => {
  let formSent = false;
  await page.route('https://api.web3forms.com/submit', (route) => {
    formSent = true;
    return route.abort();
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Umów darmowy trening' }).click();
  const dialog = page.getByRole('dialog');

  await expect(dialog.getByText('Dwa pierwsze treningi za darmo')).toBeVisible();
  await expect(dialog.getByRole('link', { name: '+48 518 580 292' })).toHaveAttribute('href', 'tel:+48518580292');
  await expect(dialog.getByRole('link', { name: 'aikidonaniedzwiedniku@gmail.com' }))
    .toHaveAttribute('href', 'mailto:aikidonaniedzwiedniku@gmail.com');
  await expect(dialog.getByText('Dzieci (3-6 lat)')).toBeVisible();
  await expect(dialog.getByText('wtorek i czwartek 18:20')).toBeVisible();

  // No personal data is asked for.
  await expect(dialog.getByRole('textbox')).toHaveCount(0);
  await expect(dialog.getByRole('checkbox')).toHaveCount(0);

  await dialog.getByRole('button', { name: 'Zamknij' }).click();
  await expect(dialog).toBeHidden();
  expect(formSent).toBe(false);
});

test('first-class page button opens the same contact popup', async ({ page }) => {
  await page.goto('/#/first-class');
  await page.getByRole('button', { name: 'Zapisz się na trening próbny' }).click();
  await expect(page.getByRole('dialog').getByText('W sprawie zapisów na zajęcia prosimy o kontakt:')).toBeVisible();
});
