const { Builder, By, until } = require("selenium-webdriver");

let driver;

const timeWaitBetwen = 300;

beforeAll(async () => {
  driver = await new Builder().forBrowser("MicrosoftEdge").build();
});

afterAll(async () => {
  // await driver.quit();
});

test("Tìm kiếm theo từ khóa “Modern Duffle Bag”", async () => {
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
