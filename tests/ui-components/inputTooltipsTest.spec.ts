import {expect, Locator, test} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Can test tooltips', () => {

  test.beforeEach(async ({page}, ) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();
  });

  // Tip: freeze the browser in debug mode with tooltip visible to explore (windows f8)
  test('Can test tooltip text', async ({page}) => {
    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole("button", {name: "Top"}).hover();

    // page.getByRole('tooltip') // can be used if the role has been correctly set, but this is not the case here
    const tooltip = await page.locator('nb-tooltip').textContent();

    expect(tooltip).toEqual("This is a tooltip");
  });
});
