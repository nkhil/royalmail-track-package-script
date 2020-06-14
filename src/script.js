const puppeteer = require('puppeteer');
const schedule = require('node-schedule');

const screenshot = 'royalmail.png';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  console.log('new page created');
  await page.goto('https://www.royalmail.com/');
  console.log('go to royalmail.com');
  console.log('Checking for cookie pop up');
  const cookiePopUpPrompt = await page.$('#consent_prompt_submit');
  if (cookiePopUpPrompt) {
    console.log('Cookie pop up exists, clicking accept');
    await page.$eval('#consent_prompt_submit', elem => elem.click());
  }
  await page.type('#edit-track-number', 'P3199562');
  console.log('type the track number');
  await page.click('[name="op"]');
  console.log('clicked submit, waiting for navigation');
  await page.waitForNavigation();
  console.log('Completed waiting for navigation');
  let errorMessage;
  try {
    errorMessage = await page.waitForSelector('.c-error', {
      timeout: 5000,
    });
  } catch (err) {
    console.log('no c-error');
  }
  if (errorMessage) {
    console.log('error message...');
    const text = await page.evaluate(
      errorMessage => errorMessage.textContent,
      errorMessage
    );
    console.log('text', text);
  } else {
    await page.screenshot({ path: screenshot });
    console.log(`See screenshot: ${screenshot}`);
  }
  browser.close();
})();
