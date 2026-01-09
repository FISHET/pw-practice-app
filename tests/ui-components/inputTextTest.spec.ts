import {expect, Locator, test} from '@playwright/test'


test.beforeEach(async ({page}, testInfo) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Can test form layout page text input fields', () => {

  test.beforeEach(async ({page}, testInfo) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test('can enter text into an input field', async ({page}) => {
    const usingTheGridEmailInput =
      page.locator('nb-card', {hasText: "Using the Grid"})
        .getByRole('textbox', {name: "Email"})

    await usingTheGridEmailInput.fill("test@test.com")
    await expect(usingTheGridEmailInput).toHaveValue("test@test.com")
  });

  test('can clear text in an input field', async ({page}) => {
    const usingTheGridEmailInput =
      page.locator('nb-card', {hasText: "Using the Grid"})
        .getByRole('textbox', {name: "Email"})

    await usingTheGridEmailInput.fill("test@test.com")
    await usingTheGridEmailInput.clear()
    await expect(usingTheGridEmailInput).not.toHaveValue("test@test.com")
  });

  test('can enter text into an input field sequentially', async ({page}) => {
    const usingTheGridEmailInput =
      page.locator('nb-card', {hasText: "Using the Grid"})
        .getByRole('textbox', {name: "Email"})

    await usingTheGridEmailInput.pressSequentially("test2@test.com", {delay: 500})
    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com")
  });
});
