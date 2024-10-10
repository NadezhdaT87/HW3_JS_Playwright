const { test, expect } = require("@playwright/test");
const { email, password, profilePage, invalidPassword } = require("../user");

test("Successful authorization", async ({ page }) => {
  
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();

  await expect(page).toHaveURL(profilePage);
  await expect(page.locator("h2")).toContainText("Моё обучение");
});
test("Unsuccessful authorization", async ({ page }) => {

  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(invalidPassword);
  await page.getByTestId('login-submit-btn').click();  

  await expect(page.locator('.hint_hint__bpsEa.inputHint')).toContainText("Вы ввели неправильно логин или пароль.");  
});
