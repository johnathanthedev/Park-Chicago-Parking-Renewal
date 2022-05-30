const puppeteer = require('puppeteer');
const { PARK_CHICAGO_URL } = require('../config/constants');

class ParkChicagoScraper {
  beginScrape = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`${PARK_CHICAGO_URL}/park`);
    await page.click('#registerBtn');
    await page.waitForSelector('#acceptTermsConditionsBtn', {
      visible: true,
    });
    await page.click('#acceptTermsConditionsBtn');
    await page.waitForSelector('#regPhoneNo', {
      visible: true,
    });
    await page.type('#regPhoneNo', `${process.env.TEMP_PHONE_NUM}`);
    await page.click('#verify_sms');
    await page.evaluate(() => {
      const popup = document.querySelector(".ui-popup[data-role='popup']");
      const popupContent = popup.querySelector(
        ".ui-content[data-role='content']"
      );
      const confirmationButton = popupContent.querySelectorAll('button')[0];
      confirmationButton.click();
    });
  };
}

module.exports = ParkChicagoScraper;
