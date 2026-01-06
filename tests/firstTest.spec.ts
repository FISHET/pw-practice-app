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

// test.describe('test suite two', () => {
//   test('the first test', () => {
//
//   })
// })
