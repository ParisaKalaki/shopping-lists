const { test, expect } = require("@playwright/test");

test("Main page has expected title and heading.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h1")).toHaveText("Lists");
});

test("Can add a list.", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.locator("h1")).toHaveText("shopping-lists");
  await expect(page.locator("h2")).toHaveText(["Add a list", "Active lists"]);
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

test("Can deactivate lists.", async ({ page }) => {
  await page.goto("/lists");
  const links = await page.locator("a");
  const buttons = await page.locator(
    "input[type=submit][value='deactivate list!']"
  );
  expect(links.length).toBe(buttons.length);
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const button = buttons[i];
    await link.click();

    expect(page.url()).toContain(`/lists/${i + 1}`);

    await button.click();
  }
});

test("Can add an item.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit][value='Create list!']").click();
  const itemName = `My item: ${Math.random()}`;
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(listName);
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit][value='Create item!']").click();
  await expect(page.locator(`span >> text='${itemName}'`)).toHaveText(itemName);
});

test("Can return to mainpage from lists.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("a >> text='MainPage'").click();
  await expect(page.locator("h1")).toHaveText("Lists");
});
