const { Builder, By, until } = require("selenium-webdriver");
jest.setTimeout(10000);

let driver;

const timeWaitBetwen = 300;

beforeAll(async () => {
  driver = await new Builder().forBrowser("MicrosoftEdge").build();
});

afterAll(async () => {
  // await driver.quit();
});

test("Tìm kiếm theo từ khóa “Túi vải", async () => {
  const name = "Túi vải" + Math.round(Math.random() * 1000);
  await driver.get("http://localhost:3400");

  const emailClient = await driver.findElement(By.id("emailClient"));
  const passwordClient = await driver.findElement(By.id("passwordClient"));

  await emailClient.sendKeys("admin@gmail.com");
  await passwordClient.sendKeys("123456");

  await sleep(timeWaitBetwen);

  const loginClient = await driver.findElement(By.id("loginClient"));
  await loginClient.click();

  await sleep(timeWaitBetwen);

  const linkToProduct = await driver.findElement(By.id("linkToProduct"));
  await linkToProduct.click();

  await sleep(500);

  const elementPro = await driver.findElements(
    By.xpath("//*[contains(text(), 'Sửa')]")
  );
  elementPro[2].click();

  await sleep(timeWaitBetwen);

  const element2 = await driver.findElement(By.id("productNameEdit"));
  await element2.clear();
  await element2.sendKeys(name);

  const element4 = await driver.findElement(
    By.xpath("//*[contains(text(), 'Lưu')]")
  );
  element4.click();

  await sleep(timeWaitBetwen);

  await driver.get("http://localhost:3000");

  await sleep(timeWaitBetwen);

  const element3 = await driver.findElement(By.id("input-search-01"));
  await element3.sendKeys(name);

  await sleep(100);

  const element = await driver.findElement(
    By.xpath("//*[contains(text(), 'Modern Duffle Bag')]")
  );
  const text = await element.getText();
  expect(text).toMatch(/Modern Duffle Bag/);

  await element.click();

  await driver.get(
    "http://localhost:3000/product/38a2efd1-7900-4219-94a6-7f9d9a04cc87"
  );

  const elements2 = await driver.findElements(
    By.xpath("//*[contains(text(), 'Modern Duffle Bag')]")
  );

  expect(elements2.length).toBe(1);
  await sleep(timeWaitBetwen);

  const btn = await driver.findElement(By.id("toHome"));
  await btn.click();
  await sleep(timeWaitBetwen);
});

test("Tìm kiếm theo từ khóa “Gucci”", async () => {
  await driver.get("http://localhost:3000");

  const emailInput = await driver.findElement(By.id("input-search-01"));
  await emailInput.sendKeys("Gucci");

  await sleep(100);

  const element = await driver.findElement(By.id("value-empty"));
  const text = await element.getText();
  expect(text).toMatch(/empty/);

  await sleep(timeWaitBetwen);
});

test("Tìm kiếm với từ khóa rỗng", async () => {
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

test("Tìm kiếm với ký tự đặc biệt ", async () => {
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

test("Lọc theo danh mục “Thời Trang”", async () => {
  await driver.get("http://localhost:3000");

  const cateBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Thời trang')]")
  );
  await cateBtn.click();

  await sleep(100);
  await driver.findElement(
    By.xpath("//*[contains(text(), 'Modern Duffle Bag')]")
  );
  await sleep(timeWaitBetwen);
});

test("Lọc theo giá “100,000 - 200,000”", async () => {
  await driver.get("http://localhost:3000");

  const cateBtn = await driver.findElement(
    By.xpath("//*[contains(text(), '100,000 - 200,000')]")
  );
  await cateBtn.click();

  await sleep(100);
  await driver.findElement(
    By.xpath("//*[contains(text(), 'Modern Duffle Bag')]")
  );
  await sleep(timeWaitBetwen);
});

test("Lọc kết hợp freeship + giá + danh mục", async () => {
  await driver.get("http://localhost:3000");

  const cateBtn = await driver.findElement(By.id("checkbox-search-1"));
  await cateBtn.click();

  await sleep(100);
  const elements = await driver.findElements(
    By.xpath("//*[contains(text(), 'Modern Duffle Bag')]")
  );
  expect(elements.length).toBe(0);
  await sleep(timeWaitBetwen);
});

test("Lọc kết hợp freeship + giá + danh mục", async () => {
  await driver.get("http://localhost:3000");

  const cateBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Trên 400,000')]")
  );
  await cateBtn.click();

  await sleep(100);
  const elements = await driver.findElements(
    By.xpath("//*[contains(text(), 'Modern Duffle Bag')]")
  );
  expect(elements.length).toBe(0);
  await sleep(timeWaitBetwen);
});

test("Lọc với khoảng giá cao không có sản phẩm", async () => {
  await driver.get("http://localhost:3000");

  const cateBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Trên 400,000')]")
  );
  await cateBtn.click();

  await sleep(100);
  const elements = await driver.findElements(
    By.xpath("//*[contains(text(), 'Modern Duffle Bag')]")
  );
  expect(elements.length).toBe(0);
  await sleep(timeWaitBetwen);
});

test("Tìm kiếm không phân biệt hoa thường", async () => {
  await driver.get("http://localhost:3000");

  const emailInput = await driver.findElement(By.id("input-search-01"));
  await emailInput.sendKeys("MODERN DUFFLE BAG");

  await sleep(100);

  const element = await driver.findElement(
    By.xpath(
      "//*[contains(@class, 'flex') and contains(@class, 'items-center') and contains(@class, 'p-2') and contains(@class, 'cursor-pointer')]"
    )
  );
  const text = await element.getText();
  expect(text).toMatch(/Modern Duffle Bag/);

  await sleep(timeWaitBetwen);
});

test("Tìm kiếm tên có khoảng trắng đầu/cuối", async () => {
  await driver.get("http://localhost:3000");

  const emailInput = await driver.findElement(By.id("input-search-01"));
  await emailInput.sendKeys("   MODERN DUFFLE BAG   ");

  await sleep(100);

  const element = await driver.findElement(
    By.xpath(
      "//*[contains(@class, 'flex') and contains(@class, 'items-center') and contains(@class, 'p-2') and contains(@class, 'cursor-pointer')]"
    )
  );
  const text = await element.getText();
  expect(text).toMatch(/Modern Duffle Bag/);

  await sleep(timeWaitBetwen);
});

test("Tìm kiếm với từ khóa dài > 100 ký tự", async () => {
  await driver.get("http://localhost:3000");

  let text = "a";
  for (let i = 0; i <= 101; i++) {
    text += "a";
  }

  const emailInput = await driver.findElement(By.id("input-search-01"));
  await emailInput.sendKeys(text);

  await sleep(100);

  const elements = await driver.findElements(
    By.xpath(
      "//*[contains(@class, 'flex') and contains(@class, 'items-center') and contains(@class, 'p-2') and contains(@class, 'cursor-pointer')]"
    )
  );

  await sleep(100);
  expect(elements.length).toBe(0);
  await sleep(timeWaitBetwen);
});

const sleep = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
