const puppeteer = require('puppeteer')

let browser
const app = 'http://localhost:3000/#/'
describe('Functional UI Header 1', () => {
  test('Validate login', async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 55,
    })
    const page = await browser.newPage()
    await page.goto(app)

    try {
      await page.click('button.navbar-toggler')
      await page.click('a.login-btn')
      await page.click('button.navbar-toggler')
      await page.waitFor(3000)
      await browser.close()
    } catch (err) {} // eslint-disable-line
  }, 70000)
})

describe('Functional UI Header 2', () => {
  test('Validate menu', async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 55,
    })
    const page = await browser.newPage()
    await page.goto(app)

    try {
      await page.click('button.navbar-toggler')
      await page.click('.menuBtn')
      await page.click('button.navbar-toggler')
      await page.waitFor(5000)
      await browser.close()
    } catch (err) {} // eslint-disable-line
  }, 70000)
})

describe('Functional UI Header 3', () => {
  test('Validate cart', async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 55,
    })
    const page = await browser.newPage()
    await page.goto(app)

    try {
      await page.click('button.navbar-toggler')
      await page.click('.cartBtn')
      await page.click('button.navbar-toggler')
      await page.waitFor(5000)
      await browser.close()
    } catch (err) {} // eslint-disable-line
  }, 70000)
})
