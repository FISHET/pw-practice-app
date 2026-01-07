import {test} from '@playwright/test'

test.describe('can test the "Forms" section', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText("Forms").click();
  })

  test('can navigate to the "Form Layouts" page', async ({page}) => {
    await page.getByText("Form Layouts").click();
  })

  test('can navigate to the "Datepicker" page', async ({page}) => {
    await page.getByText("Datepicker").click();
  })
})

test.describe('can test the "Forms Layouts" page', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  })

  test('can grab items using locators', async ({page}) => {
    // by Tag - plain text (finds 20 elements)
    page.locator('input')

    // so if you want to click, you need to select one, e.g.
    await page.locator('input').first().click();

    // by ID = #something
    page.locator('#inputEmail1')

    // by Class value - .something
    page.locator('.shape-rectangle')

    // by Attribute - square braces
    page.locator('[placeholder="Email"]')

    // by Class value - entire class string inside square braces
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine selectors - concat, don't add spaces
    page.locator('input[placeholder="Email"]')

    // partial text match
    page.locator(':text("using")')

    // exact text match
    page.locator(':text-is("Using the Grid")')

  })

  test('can grab items using user-facing locators', async ({page}) => {
    // by role
    await page.getByRole('textbox', {name: "Email"}).first().click();
    await page.getByRole('button', {name: "SIGN IN"}).first().click();

    // by label
    await page.getByLabel('Email').first().click();

    // by placeholder
    await page.getByPlaceholder('Jane Doe').click();

    // by text
    await page.getByText('Using the Grid').click();

    // by Test ID (sometimes considered a best practice, as adds stability, but is not really user-facing, so bear that in mind
    await page.getByTestId('SignIn').click();

    // by title
    await page.getByTitle('IoT Dashboard').click();
  })

  test('can test child elements', async ({page}) => {
    // combine locator operators
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();

    // or, chain
    await page
      .locator('nb-card')
      .locator('nb-radio')
      .locator(':text-is("Option 2")')
      .click();

    // you can also chain different types of locators
    await page
      .locator('nb-card')
      .getByRole('button', {name: "SIGN IN"})
      .first().click();

    // you can pull out a particular entry from all returned results - however this can be flakey if the app is still under development
    await page
      .locator('nb-card')
      .nth(3)
      .click();
  })

  test('locating parent elements', async ({page}) => {

    // use locator option argument
    await page
      .locator('nb-card', {hasText: "Using the Grid"})
      .getByRole('textbox', {name: "Email"})
      .click();

    await page
      .locator('nb-card', {has: page.locator('#inputEmail1')})
      .getByRole('textbox', {name: "Email"})
      .click();

    // use filter
    await page
      .locator('nb-card')
      .filter({hasText: "Basic form"})
      .getByRole('textbox', {name: "Email"})
      .click();

    await page
      .locator('nb-card')
      .filter({has: page.locator('.status-danger')})
      .getByRole('textbox', {name: "Password"})
      .click();

    await page.locator('nb-card')
      .filter({has: page.locator('nb-checkbox')}) // returns 3
      .filter({hasText: "Sign in"}) // returns one
      .getByRole('textbox', {name: "Email"})
      .click();

    // by xPath
    await page.locator(':text-is("Using the Grid")')
      .locator('..')
      .getByRole('textbox', {name: "Email"})
      .click();

  })
})
