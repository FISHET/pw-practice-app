import {expect, test} from '@playwright/test'

test.describe('can test the "Forms Layouts" page', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  })

  // by Tag - plain text (finds 20 elements)
  test('can get element by tag', async ({page}) => {
    page.locator('input')
  })

  // so if you want to click, you need to select one, e.g.
  test('can get element by first tag', async ({page}) => {
    await page.locator('input').first().click();
  })

  // by ID = #something
  test('can get element by ID', async ({page}) => {
    page.locator('#inputEmail1')
  })

  // by Class value - .something
  test('can get element by class', async ({page}) => {
    page.locator('.shape-rectangle')
  })

  // by Attribute - square braces
  test('can get element by attribute', async ({page}) => {
    page.locator('[placeholder="Email"]')
  })

  // by Class value - entire class string inside square braces
  test('can get element by class string', async ({page}) => {
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
  })

  // combine selectors - concat, don't add spaces
  test('can get element by combining selectors ', async ({page}) => {
    page.locator('input[placeholder="Email"]')
  })

  // partial text match
  test('can get element by partial text match', async ({page}) => {
    page.locator(':text("using")')
  })

  // exact text match
  test('can get element by exact text match', async ({page}) => {
    page.locator(':text-is("Using the Grid")')
  })

  // by role
  test('can grab items using user-facing role locators', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click();
    await page.getByRole('button', {name: "SIGN IN"}).first().click();
  })

  // by label
  test('can grab items using user-facing label locators', async ({page}) => {
    await page.getByLabel('Email').first().click();
  })

  // by placeholder
  test('can grab items using user-facing placeholder locators', async ({page}) => {
    await page.getByPlaceholder('Jane Doe').click();
  })

  // by text
  test('can grab items using user-facing text locators', async ({page}) => {
    await page.getByText('Using the Grid').click();
  })

  // by Test ID (sometimes considered a best practice, as adds stability, but is not really user-facing, so bear that in mind
  test('can grab items using user-facing testId locators', async ({page}) => {
    await page.getByTestId('SignIn').click();
  })

  // by title
  test('can grab items using user-facing title locators', async ({page}) => {
    await page.getByTitle('IoT Dashboard').click();
  })

  test('can test child elements via locator operators', async ({page}) => {
    // combine locator operators
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  })

  test('can test child elements via chaining', async ({page}) => {
    // or, chain
    await page
      .locator('nb-card')
      .locator('nb-radio')
      .locator(':text-is("Option 2")')
      .click();
  })

  // you can also chain different types of locators
  test('can test child elements via chaining different locators', async ({page}) => {
    await page
      .locator('nb-card')
      .getByRole('button', {name: "SIGN IN"})
      .first().click();
  })

  // you can pull out a particular entry from all returned results - however this can be flakey if the app is still under development
  test('can test child elements via pulling an entry from a list', async ({page}) => {
    await page
      .locator('nb-card')
      .nth(3)
      .click();
  })

  test('locating parent elements via "hasText" locator argument', async ({page}) => {
    // use locator option argument
    await page
      .locator('nb-card', {hasText: "Using the Grid"})
      .getByRole('textbox', {name: "Email"})
      .click();
  })

  test('locating parent elements via "has: page.locator" locator argument', async ({page}) => {
    await page
      .locator('nb-card', {has: page.locator('#inputEmail1')})
      .getByRole('textbox', {name: "Email"})
      .click();
  })

  // use filter
  test('locating parent elements via "hasText" filter', async ({page}) => {
    await page
      .locator('nb-card')
      .filter({hasText: "Basic form"})
      .getByRole('textbox', {name: "Email"})
      .click();
  })

  test('locating parent elements via "has: page.locator" filter', async ({page}) => {
    await page
      .locator('nb-card')
      .filter({has: page.locator('.status-danger')})
      .getByRole('textbox', {name: "Password"})
      .click();
  })

  test('locating parent elements via double-filtering', async ({page}) => {
    await page.locator('nb-card')
      .filter({has: page.locator('nb-checkbox')}) // returns 3
      .filter({hasText: "Sign in"}) // returns one
      .getByRole('textbox', {name: "Email"})
      .click();
  })

  // by xPath
  test('locating parent elements via xPath', async ({page}) => {
    await page.locator(':text-is("Using the Grid")')
      .locator('..')
      .getByRole('textbox', {name: "Email"})
      .click();
  })

  test('Reusing locators', async ({page}) => {

    // you can set locators as constants - this is code, after all!
    const basicForm = page
      .locator('nb-card')
      .filter({hasText: "Basic form"})

    // which makes this simpler to understand:
    const emailField = basicForm
      .getByRole('textbox', {name: "Email"})

    await emailField
      .fill('test@test.com');

    await basicForm
      .getByRole('textbox', {name: "Password"})
      .fill('Welcome123');

    await basicForm
      .getByRole('button')
      .click();

    // and then use them in assertions
    await expect(emailField).toHaveValue("test@test.com");
  })
})
