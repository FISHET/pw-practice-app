import {expect, Locator, test} from '@playwright/test'

test.describe('Can use timeouts', () => {

  let successButton: Locator;

  test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText("Button Triggering AJAX Request").click();

    // you can set suite-wide timeouts in the beforeEach:
    testInfo.setTimeout(testInfo.timeout + 10000);

    successButton = page.locator(".bg-success");
  })

  test('Can set timeouts', async () => {
    // override with setTimeout
    test.setTimeout(16000);
    // or, use this command to treble the wait time for just this test
    test.slow();
    // or, within the action
    await successButton.click({timeout: 16000});
  })

});
