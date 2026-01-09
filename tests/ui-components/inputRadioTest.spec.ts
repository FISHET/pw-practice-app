import {expect, Locator, test} from '@playwright/test'


test.beforeEach(async ({page}, testInfo) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Can test form layout page radio buttons fields', () => {

  test.beforeEach(async ({page}, testInfo) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test('can select radio buttons by label', async ({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
    const optionOne = usingTheGridForm.getByLabel('Option 1')
    // this element is visually hidden, therefore we need to "force" it
    await optionOne.check({force: true});

    await expect(optionOne).toBeChecked();
  })

  test('can select radio buttons by role', async ({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
    const optionOne = usingTheGridForm.getByRole('radio', {name: "Option 1"})
    // this element is visually hidden, therefore we need to "force" it
    await optionOne.check({force: true});

    await expect(optionOne).toBeChecked();
  })

  test('can uncheck radio buttons by checking another', async ({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
    const optionOne = usingTheGridForm.getByRole('radio', {name: "Option 1"})
    const optionTwo = usingTheGridForm.getByRole('radio', {name: "Option 2"})
    // this element is visually hidden, therefore we need to "force" it
    await optionOne.check({force: true});
    await optionTwo.check({force: true});

    await expect(optionOne).not.toBeChecked();
  })
})
