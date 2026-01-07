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
})
