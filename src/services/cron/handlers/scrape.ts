import { ScheduledHandler } from 'aws-lambda'
import launchPuppeteerBrowserSession, {
  GetDataWithPage,
} from 'simply-utils/dist/scraping/launchPuppeteerBrowserSession'
import IndexPriceRecord from 'src/models/IndexPriceRecord.type'

const PAGE_URL = 'https://finance.yahoo.com/world-indices/'
const getDataFromPage: GetDataWithPage<IndexPriceRecord[]> = async page => {
  // Navigate to the page we want to scrape
  await page.goto(PAGE_URL)
  // Wait for some element to be rendered completely
  await page.waitForSelector('.yfinlist-table > tbody > tr:last-child > td:last-child')
  return page.evaluate((): IndexPriceRecord[] => {
    const tableRows = document.querySelectorAll('.yfinlist-table > tbody > tr')
    return [{
      symbol: '',
      name: '',
      lastPrice: tableRows.length,
      change: 0,
      changeRate: 0,
      time: '',
    }]
  })
}

export const handler: ScheduledHandler = async () => {
  const results = await launchPuppeteerBrowserSession([getDataFromPage])
  console.log(JSON.stringify(results, null, 2))
}