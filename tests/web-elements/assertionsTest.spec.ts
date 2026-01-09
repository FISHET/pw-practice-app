import {expect, Locator, test} from '@playwright/test'

test.describe('Can use different assertions', () => {

  let basicForm: Locator;
  let basicFormButton: Locator;

  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();

    basicForm = page
      .locator('nb-card')
      .filter({hasText: "Basic form"});

    basicFormButton= basicForm.locator('button');
  });

  test('Can leverage generic assertions in theory', () => {
    const value = 5;
    expect(value).toBe(5);
    expect(value).not.toBe(6);
  });

  test('Can leverage generic assertions in practice', async () => {
    const text = await basicFormButton.textContent();
    expect(text).toEqual("Submit");
  });

  test('Can leverage a locator assertion', async () => {
    await expect(basicFormButton).toHaveText("Submit");
  })

  test('Can leverage a soft assertion', async () => {
    await expect.soft(basicFormButton).toHaveText("Submitt");
    // in this case, the test will continue to the below step, but only return failure at the end of the test
    await basicFormButton.click();
  });
});
