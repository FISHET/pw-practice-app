import {expect, Locator, test} from '@playwright/test'


test.beforeEach(async ({page}, testInfo) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Can test "Modal & Overlays" page checkboxes', () => {

  test.beforeEach(async ({page}) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();
  });

  test('can uncheck checkboxes by role using click', async ({page}) => {
    const hideOnClick = page.getByRole('checkbox', {name: "Hide on click"})

    // click will toggle CHECKED
    await hideOnClick.click({force: true});

    await expect(hideOnClick).not.toBeChecked();
  })

  test('can check checkboxes by role using click', async ({page}) => {
    const duplicateToast = page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"})

    // click will toggle CHECKED
    await duplicateToast.click({force: true});

    await expect(duplicateToast).toBeChecked();
  })

  test('can check checkboxes by role using check', async ({page}) => {
    const hideOnClick = page.getByRole('checkbox', {name: "Hide on click"})

    // check will always set the state to CHECKED
    await hideOnClick.check({force: true});

    await expect(hideOnClick).toBeChecked();
  })

  test('can uncheck checkboxes by role using uncheck', async ({page}) => {
    const hideOnClick = page.getByRole('checkbox', {name: "Hide on click"})

    // check will always set the state to CHECKED
    await hideOnClick.uncheck({force: true});

    await expect(hideOnClick).not.toBeChecked();
  })

  test('can check all checkboxes', async ({page}) => {
    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
      await box.check({force: true});
      expect(await box.isChecked()).toBeTruthy();
    }
  })

  test('can uncheck all checkboxes', async ({page}) => {
    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
      await box.uncheck({force: true});
      expect(await box.isChecked()).toBeFalsy();
    }
  })

});
