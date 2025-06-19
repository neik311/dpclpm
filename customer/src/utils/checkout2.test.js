// const { Builder, By, until } = require("selenium-webdriver");

// let driver;

// const timeWaitBetwen = 300;

// beforeAll(async () => {
//   driver = await new Builder().forBrowser("MicrosoftEdge").build();
// });

// afterAll(async () => {
//   // await driver.quit();
// });

// test("Đăng nhập", async () => {
//   await sleep(5000)
//   await driver.get("http://localhost:3000/login");


//   const email = await driver.findElement(By.id("email"));
//   const password = await driver.findElement(By.id("password"));

//   await email.sendKeys("tuxuanbui1111@gmail.com");
//   await password.sendKeys("123");

//   await sleep(100);

//   const btn = await driver.findElement(
//     By.xpath("//*[contains(text(), 'Đăng nhập')]")
//   );
//   await btn.click();

//   await sleep(timeWaitBetwen);
// });

// test("Thêm sản phẩm", async () => {
//   await driver.get("http://localhost:3000");

//   const btn = await driver.findElement(
//     By.xpath("//*[contains(text(), 'Thêm vào giỏ')]")
//   );
//   await btn.click();

//   await sleep(3000);

//   const btn2 = await driver.findElement(By.id("cart"));
//   await btn2.click();

//    await sleep(timeWaitBetwen);
// });

// test("Đặt hàng từ giỏ hàng", async () => {
//   await driver.get("http://localhost:3000/cart");
//   await sleep(100);

//   const btn = await driver.findElement(By.id("thanhtoan"));
//   await btn.click();
//   await sleep(100);

//   const firstName = await driver.findElement(By.id("firstName"));
//   const lastName = await driver.findElement(By.id("lastName"));
//   const address = await driver.findElement(By.id("address"));
//   const phone = await driver.findElement(By.id("phone"));

//   //   const btn = await driver.findElement(By.id("submit"));

//   await firstName.sendKeys("Tu@");
//   await lastName.sendKeys("Bui@");
//   await address.sendKeys("a".repeat(256));
//   await phone.sendKeys("0998989898");

//   const btn3 = await driver.findElement(
//     By.xpath("//*[contains(text(), 'Đặt hàng')]")
//   );
//   await btn3.click();

//   await sleep(100);

//   const element = await driver.findElement(
//     By.xpath("//*[contains(text(), 'Địa chỉ không được vượt quá 255 ký tự')]")
//   );
//   //   const text = await element.getText();
//   //   expect(text).toMatch(/Modern Duffle Bag/);

//   await sleep(timeWaitBetwen);
// });


// const sleep = async (ms) => {
//   await new Promise((resolve) => setTimeout(resolve, ms));
// };