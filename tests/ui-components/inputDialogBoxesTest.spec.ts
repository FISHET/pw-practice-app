import {expect, Locator, test} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
  await page.goto('http://localhost:4200/')
})

// there are two kinds of boxes - ones in the DOM, and those that are triggered in the browser
test.describe('Can test dialog boxes', () => {

  test('Can test browser-based popups', async ({page}) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    // by default, playwright will cancel browser pop-ups, so we need to explicitly accept them using a listener
    page.on('dialog', dialog => {
      expect(dialog.message()).toEqual('Are you sure you want to delete?');
      dialog.accept();
    })

    // then we can complete the delete action
    await page
      .getByRole("table")
      .locator('tr', {hasText: "mdo@gmail.com"})
      .locator('.nb-trash')
      .click();

    // then let's check it has been actioned
    await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com");
  });
});
