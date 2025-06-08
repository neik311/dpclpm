const { Builder, By, until } = require("selenium-webdriver");

let driver;

const timeWaitBetwen = 300

beforeAll(async () => {
  driver = await new Builder().forBrowser("MicrosoftEdge").build();
});

afterAll(async () => {
  // await driver.quit();
});

test("Tìm kiếm theo tên: Modern Duffle Bag", async () => {
  await driver.get("http://localhost:3000");

  const emailInput = await driver.findElement(By.id("input-search-01"));
  await emailInput.sendKeys("Modern Duffle Bag");

  await sleep(100);

  const element = await driver.findElement(
    By.xpath(
      "//*[contains(@class, 'flex') and contains(@class, 'items-center') and contains(@class, 'p-2') and contains(@class, 'cursor-pointer')]"
    )
  );
  const text = await element.getText();
  expect(text).toMatch(/Modern Duffle Bag/);

  await sleep(timeWaitBetwen);

  // const submitBtn = await driver.findElement(By.id('submit'));
  // await submitBtn.click();

  // const message = await driver.wait(
  //   until.elementLocated(By.className('success-msg')),
  //   5000
  // );
});

test("Tìm kiếm theo tên: Gucci", async () => {
  await driver.get("http://localhost:3000");

  const emailInput = await driver.findElement(By.id("input-search-01"));
  await emailInput.sendKeys("Gucci");

  await sleep(100);

  const element = await driver.findElement(By.id("value-empty"));
  const text = await element.getText();
  expect(text).toMatch(/empty/);

  await sleep(timeWaitBetwen);
});

test("Tìm kiếm theo tên: rỗng", async () => {
  await driver.get("http://localhost:3000");

  const emailInput = await driver.findElement(By.id("input-search-01"));
  await emailInput.sendKeys("");

  const submitBtn = await driver.findElement(By.id("icon-search-01"));
  await submitBtn.click();

  await sleep(100);
  await driver.findElement(
    By.xpath("//*[contains(text(), 'Vui lòng nhập tên sản phẩm')]")
  );
  await sleep(timeWaitBetwen);
});

const sleep = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
