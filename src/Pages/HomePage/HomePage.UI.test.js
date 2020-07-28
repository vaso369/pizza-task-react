const puppeteer = require('puppeteer')

let browser
const app = 'http://localhost:3000/#/'
describe('Functional UI HomePage 1', () => {
  test('Validate Home page', async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 55,
    })
    const page = await browser.newPage()
    await page.goto(app)

    try {
      await page.waitFor(4000)
      await autoScroll(page) // eslint-disable-line
      await page.waitFor(1000)
      // eslint-disable-next-line
      await page.evaluate((_) => {
        // eslint-disable-line
        window.scrollTo(0, 0)
      })
      await page.waitFor(4000)
      await page.click('.selectList:nth-of-type(2)')
      await autoScroll(page) // eslint-disable-line
      await page.waitFor(2000)

      await browser.close()
    } catch (err) {} // eslint-disable-line
  }, 70000)
})

describe('Functional UI HomePage 2', () => {
  test('Validate Home  USD', async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 55,
    })
    const page = await browser.newPage()
    await page.goto(app)

    try {
      await page.waitFor(4000)
      await page.click('.selectList:nth-of-type(1)')
      await page.waitFor(1000)
      await page.select('.selectList:nth-of-type(1)', 'USD')
      //   await page.click('.selectList:nth-of-type(1)')
      await page.waitFor(4000)
      await autoScroll(page) // eslint-disable-line
      await page.waitFor(5000)
      await browser.close()
    } catch (err) {} // eslint-disable-line
  }, 70000)
})

describe('Functional UI HomePage 3', () => {
  test('Validate Home  PerPage', async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 55,
    })
    const page = await browser.newPage()
    await page.goto(app)

    try {
      await page.waitFor(4000)
      await autoScroll(page) // eslint-disable-line
      const linkHandlers = await page.$x('//*[@id="root"]/div[1]/div[3]/div/button[2]')
      if (linkHandlers.length > 0) {
        await linkHandlers[0].click()
      } else {
        throw new Error('Link not found')
      }
      // eslint-disable-next-line
      await page.evaluate((_) => {
        window.scrollTo(0, 0)
      })
      await autoScroll(page) // eslint-disable-line
      const linkHandlers2 = await page.$x('//*[@id="root"]/div[1]/div[3]/div/button[3]')
      if (linkHandlers.length > 0) {
        await linkHandlers2[0].click()
      } else {
        throw new Error('Link not found')
      }
      // eslint-disable-next-line
      await page.evaluate((_) => {
        window.scrollTo(0, 0)
      })
      await autoScroll(page) // eslint-disable-line
      await page.waitFor(1000)
      await browser.close()
    } catch (err) {} // eslint-disable-line
  }, 70000)
})

async function autoScroll(page) {
  await page.evaluate(async () => {
    // eslint-disable-next-line
    await new Promise((resolve, reject) => {
      let totalHeight = 0
      const distance = 100
      const timer = setInterval(() => {
        const { scrollHeight } = document.body
        window.scrollBy(0, distance)
        totalHeight += distance

        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 700)
    })
  })
}
