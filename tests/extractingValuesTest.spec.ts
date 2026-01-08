import {expect, Locator, test} from '@playwright/test'

test.describe('Can extract values', () => {

  let basicForm: Locator;
  let emailField: Locator;

  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();

   basicForm = page
      .locator('nb-card')
      .filter({hasText: "Basic form"})

    emailField = basicForm.getByRole('textbox', {name: "Email"});
  })

  test('extracting single text value', async ({page}) => {
    const buttonText = await basicForm
      .locator('button')
      .textContent();

    expect(buttonText).toEqual('Submit');
  });

  test('extracting multiple text values', async ({page}) => {
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonLabels).toContain('Option 1');
  });

  test('extract input value', async () => {
    await emailField.fill('test@test.com');

    const emailValue = await emailField.inputValue();

    expect(emailValue).toEqual("test@test.com");
  });

  test('extracting attribute values', async () => {
    const placeholderValue = await emailField.getAttribute('placeholder');

    expect(placeholderValue).toEqual("Email")
  })

});
