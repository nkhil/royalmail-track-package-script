const puppeteer = require('puppeteer');

const screenshot = 'royalmail.png';

(async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  console.log('new page created');
  await page.goto('https://www.royalmail.com/');
  console.log('go to royalmail.com');
  console.log('clicking on accept');
  await page.$eval('#consent_prompt_submit', elem => elem.click());
  console.log('clicked on accept - done');
  await page.type('#edit-track-number', 'P3199562');
  console.log('type the track number');
  await page.click('[name="op"]');
  console.log('clicked submit, waiting for navigation');
  await page.waitForNavigation()
  console.log('Completed waiting for navigation');
  const errorMessage = await page.$('.cerror');
  if (!errorMessage) {
    await page.screenshot({ path: screenshot });
  }
  browser.close();
  console.log('See screenshot: ' + screenshot)
})()


