import {expect, Locator, test} from '@playwright/test'
import {state} from "@angular/animations";

test.describe('Can use auto-waits', () => {

  let successButton: Locator;

  test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText("Button Triggering AJAX Request").click();

    successButton = page.locator(".bg-success");
  })

  /**
   * by default, the await action will wait up to 30 seconds for the button to appear, before timing out.
   * this behaviour can be configured in playwright.config.ts
   */
  test('Can leverage auto-wait', async ({page}) => {
    await successButton.click();
    const successButtonText = await successButton.textContent();

    expect(successButtonText).toEqual("Data loaded with AJAX get request.");
  });

  test('Can leverage our own wait', async ({page}) => {
    await successButton.waitFor({state: "attached"});
    const successButtonText = await successButton.allTextContents();

    expect(successButtonText).toContain("Data loaded with AJAX get request.");
  });

  test('Can leverage custom await in assertion', async ({page}) => {
    await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000});
  })

  test('can leverage wait for element', async ({page}) => {
    await page.waitForSelector('.bg-success');

    const successButtonText = await successButton.allTextContents();
    expect(successButtonText).toContain("Data loaded with AJAX get request.");
  });

  test('can leverage wait for particular network response', async ({page}) => {
    await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

    const successButtonText = await successButton.allTextContents();
    expect(successButtonText).toContain("Data loaded with AJAX get request.");
  });

  // not recommended - all api calls MUST complete to progress, which may not be important for this test!
  test('can leverage wait for network calls to be completed', async ({page}) => {
    await page.waitForLoadState('networkidle');

    const successButtonText = await successButton.allTextContents();
    expect(successButtonText).toContain("Data loaded with AJAX get request.");
  });


});
