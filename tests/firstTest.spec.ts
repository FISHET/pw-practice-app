import {test} from '@playwright/test'

test.describe('test suite one', () => {
  test('the first test', async ({page}) => {
    await page.goto('http://localhost:4200/pages/iot-dashboard')

    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  })
})

// test.describe('test suite two', () => {
//   test('the first test', () => {
//
//   })
// })
