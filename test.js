const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo UI Test - Sesi 9', function () {
    let driver;

    this.timeout(30000);

    it('Skenario 1: Login Sukses & Sort Z-A (Chrome)', async function () {
        let options = new chrome.Options();
        options.addArguments('--incognito');
        options.addArguments('--no-sandbox'); 
        options.addArguments('--disable-dev-shm-usage'); 
        
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        try {
            await driver.get('https://www.saucedemo.com');

            await driver.findElement(By.css('[data-test="username"]')).sendKeys('standard_user');
            await driver.findElement(By.css('[data-test="password"]')).sendKeys('secret_sauce');
            await driver.findElement(By.css('#login-button')).click();

            await driver.wait(until.elementLocated(By.className('inventory_list')), 10000);

            let dropdownSort = await driver.wait(until.elementLocated(By.css('[data-test="product-sort-container"]')), 5000);
            await dropdownSort.click();
            await driver.sleep(500);

            let zaOption = await driver.findElement(By.css('option[value="za"]'));
            await zaOption.click();
            await driver.sleep(1000);

            let firstItem = await driver.findElement(By.className('inventory_item_name'));
            let itemName = await firstItem.getText();
            
            console.log('Item Pertama:', itemName);
            assert.strictEqual(itemName, 'Test.allTheThings() T-Shirt (Red)');

        } finally {
            await driver.quit();
        }
    });

    it('Skenario 2: Cek Halaman Login (Firefox)', async function () {
        driver = await new Builder().forBrowser('firefox').build();

        try {
            await driver.get('https://www.saucedemo.com');
            let title = await driver.getTitle();
            assert.strictEqual(title, 'Swag Labs');
        } finally {
            await driver.quit();
        }
    });
});
