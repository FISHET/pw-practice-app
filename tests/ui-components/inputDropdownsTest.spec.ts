import {expect, Locator, test} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Can test dropdowns', () => {

  const backgroundColours = {
    "Light" : 'rgb(255, 255, 255)',
    "Dark" : 'rgb(34, 43, 69)',
    "Cosmic" : 'rgb(50, 50, 89)',
    "Corporate" : 'rgb(255, 255, 255)',
  }

  test('Can test dropdown contains expected items', async ({page}) => {
    const dropdownBox = page.locator('ngx-header nb-select');
    await dropdownBox.click();

    // can grab by nested locator
    const optionListItems = page
      .getByRole('list')
      .locator('nb-option');

    // or one-liner
    // const optionList = page.locator('nb-option-list nb-option');

    await expect(optionListItems).toHaveText([
      "Light",
      "Dark",
      "Cosmic",
      "Corporate"
    ])
  });

  test('Can test dropdown selection changes background colour for each theme', async ({page}) => {
    const dropdownBox = page.locator('ngx-header nb-select');

    const optionListItems = page
      .getByRole('list')
      .locator('nb-option');

    const header = page.locator('nb-layout-header');

    for(const colour in backgroundColours) {
      await dropdownBox.click();
      await optionListItems.filter({hasText: colour}).click();
      await expect(header).toHaveCSS('background-color', backgroundColours[colour]);
    }
  });

});
