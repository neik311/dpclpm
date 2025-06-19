const { Builder, By } = require("selenium-webdriver");

let driver;
const timeWaitBetwen = 300;
jest.setTimeout(30000);

beforeAll(async () => {
  driver = await new Builder().forBrowser("MicrosoftEdge").build();
});

afterAll(async () => {
  // await driver.quit();
});

test("Quy trình đặt hàng", async () => {
  await login("tuxuanbui1111@gmail.com", "123");
  await sleep(3000);
  await addProductToCart();
  await placeOrder({
    firstName: "bui",
    lastName: "tu",
    address: "97 Man Thien",
    phone: "0998989898",
  });

  await sleep(3000);
});

test("Quy trình đặt hàng: Nhập tên không hợp lệ", async () => {
  // await login("tuxuanbui1111@gmail.com", "123");
  await addProductToCart();
  await placeOrderNameFail({
    firstName: "bui@",
    lastName: "tu",
    address: "97 Man Thien",
    phone: "0998989898",
  });
});

test("Quy trình đặt hàng: Nhập địa chỉ quá 255 ký tự", async () => {
  await sleep(3000);
  await addProductToCart();
  await placeOrderAddressFail({
    firstName: "bui",
    lastName: "tu",
    address: "a".repeat(256),
    phone: "0998989898",
  });
});

test("Quy trình đặt hàng: Nhập địa chỉ quá 255 ký tự", async () => {
  await sleep(3000);
  await addProductToCart();
  await placeOrderAddressFail({
    firstName: "bui",
    lastName: "tu",
    address: "97 Man Thien",
    phone: "099898989899",
  });
});

test("Quy trình đặt hàng: Số lượng đặt vượt quá số lượng tồn", async () => {
  await sleep(3000);
  await addProductToCart1();
  await placeOrderQuantityFail({
    firstName: "bui",
    lastName: "tu",
    address: "97 Man Thien",
    phone: "0562129598",
  });
});

async function login(emailStr, passwordStr) {
  await driver.get("http://localhost:3000/login");

  const email = await driver.findElement(By.id("email"));
  const password = await driver.findElement(By.id("password"));

  await email.sendKeys(emailStr);
  await password.sendKeys(passwordStr);
  await sleep(100);

  const loginBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Đăng nhập')]")
  );
  await loginBtn.click();

  await sleep(timeWaitBetwen);
}

async function addProductToCart() {
  await driver.get("http://localhost:3000");

  const addBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Thêm vào giỏ')]")
  );
  await addBtn.click();

  await sleep(3000);

  const cartBtn = await driver.findElement(By.id("cart"));
  await cartBtn.click();

  await sleep(timeWaitBetwen);
}

async function addProductToCart1() {
  await driver.get("http://localhost:3000");

  const addBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Thêm vào giỏ')]")
  );
  await addBtn.click();

  await sleep(3000);

  const cartBtn = await driver.findElement(By.id("cart"));
  await cartBtn.click();

  await sleep(1000);

  let inputE = await driver.findElement(By.id("quantity0"));
  await inputE.sendKeys(100000);

  await sleep(timeWaitBetwen);
}

async function placeOrder({ firstName, lastName, address, phone }) {
  await driver.get("http://localhost:3000/cart");
  await sleep(100);

  const checkoutBtn = await driver.findElement(By.id("thanhtoan"));
  await checkoutBtn.click();
  await sleep(100);

  const firstNameInput = await driver.findElement(By.id("firstName"));
  const lastNameInput = await driver.findElement(By.id("lastName"));
  const addressInput = await driver.findElement(By.id("address"));
  const phoneInput = await driver.findElement(By.id("phone"));

  await firstNameInput.sendKeys(firstName);
  await lastNameInput.sendKeys(lastName);
  await addressInput.sendKeys(address);
  await phoneInput.sendKeys(phone);

  const orderBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Đặt hàng')]")
  );
  await orderBtn.click();

  await sleep(100);

  const successMsg = await driver.findElement(
    By.xpath("//*[contains(text(), 'Cảm ơn bạn đã đặt hàng')]")
  );

  const back = await driver.findElement(By.id("back"));
  await back.click();

  await sleep(timeWaitBetwen);
}

async function placeOrderNameFail({ firstName, lastName, address, phone }) {
  await driver.get("http://localhost:3000/cart");
  await sleep(100);

  const checkoutBtn = await driver.findElement(By.id("thanhtoan"));
  await checkoutBtn.click();
  await sleep(100);

  const firstNameInput = await driver.findElement(By.id("firstName"));
  const lastNameInput = await driver.findElement(By.id("lastName"));
  const addressInput = await driver.findElement(By.id("address"));
  const phoneInput = await driver.findElement(By.id("phone"));

  await firstNameInput.sendKeys(firstName);
  await lastNameInput.sendKeys(lastName);
  await addressInput.sendKeys(address);
  await phoneInput.sendKeys(phone);

  const orderBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Đặt hàng')]")
  );
  await orderBtn.click();
  await driver.findElement(
    By.xpath(
      "//*[contains(text(), 'Họ và tên không được chứa ký tự đặc biệt hoặc số.')]"
    )
  );
  // await alert.accept(); // bấm nút OK
  await sleep(timeWaitBetwen);
}

async function placeOrderAddressFail({ firstName, lastName, address, phone }) {
  await driver.get("http://localhost:3000/cart");
  await sleep(100);

  const checkoutBtn = await driver.findElement(By.id("thanhtoan"));
  await checkoutBtn.click();
  await sleep(100);

  const firstNameInput = await driver.findElement(By.id("firstName"));
  const lastNameInput = await driver.findElement(By.id("lastName"));
  const addressInput = await driver.findElement(By.id("address"));
  const phoneInput = await driver.findElement(By.id("phone"));

  await firstNameInput.sendKeys(firstName);
  await lastNameInput.sendKeys(lastName);
  await addressInput.sendKeys(address);
  await phoneInput.sendKeys(phone);

  const orderBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Đặt hàng')]")
  );
  await orderBtn.click();

  await sleep(100);

  const successMsg = await driver.findElement(
    By.xpath("//*[contains(text(), 'Địa chỉ không được vượt quá 255 ký tự.')]")
  );

  // await driver.switchTo().alert().accept();

  await sleep(timeWaitBetwen);
}

async function placeOrderPhoneFail({ firstName, lastName, address, phone }) {
  await driver.get("http://localhost:3000/cart");
  await sleep(100);

  const checkoutBtn = await driver.findElement(By.id("thanhtoan"));
  await checkoutBtn.click();
  await sleep(100);

  const firstNameInput = await driver.findElement(By.id("firstName"));
  const lastNameInput = await driver.findElement(By.id("lastName"));
  const addressInput = await driver.findElement(By.id("address"));
  const phoneInput = await driver.findElement(By.id("phone"));

  await firstNameInput.sendKeys(firstName);
  await lastNameInput.sendKeys(lastName);
  await addressInput.sendKeys(address);
  await phoneInput.sendKeys(phone);

  const orderBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Đặt hàng')]")
  );
  await orderBtn.click();

  await sleep(100);

  const successMsg = await driver.findElement(
    By.xpath(
      "//*[contains(text(), 'Số điện thoại phải đúng 10 chữ số và không có ký tự đặc biệt.')]"
    )
  );

  // await driver.switchTo().alert().accept();

  await sleep(timeWaitBetwen);
}

async function placeOrderQuantityFail({ firstName, lastName, address, phone }) {
  await driver.get("http://localhost:3000/cart");
  await sleep(100);

  const checkoutBtn = await driver.findElement(By.id("thanhtoan"));
  await checkoutBtn.click();
  await sleep(100);

  const firstNameInput = await driver.findElement(By.id("firstName"));
  const lastNameInput = await driver.findElement(By.id("lastName"));
  const addressInput = await driver.findElement(By.id("address"));
  const phoneInput = await driver.findElement(By.id("phone"));

  await firstNameInput.sendKeys(firstName);
  await lastNameInput.sendKeys(lastName);
  await addressInput.sendKeys(address);
  await phoneInput.sendKeys(phone);

  const orderBtn = await driver.findElement(
    By.xpath("//*[contains(text(), 'Đặt hàng')]")
  );
  await orderBtn.click();

  await sleep(100);

  const successMsg = await driver.findElement(
    By.xpath("//*[contains(text(), 'Số lượng đặt vướt quá số lượng tồn')]")
  );

  // await driver.switchTo().alert().accept();

  await sleep(timeWaitBetwen);
}

const sleep = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
