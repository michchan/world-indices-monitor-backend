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
    const tableRows: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('.yfinlist-table > tbody > tr')
    /**
     * We have to put this inside the callback function of page.evaluate,
     * because it need to be in the virtual client-side scope.
     */
    const parseNum = (text: string): number => parseFloat(text.replace(/\+|,|%/g, ''))

    return Array.from(tableRows).map(tableRow => {
      // Tell typescript that it is a list of data cells
      const cols = tableRow.children as HTMLCollectionOf<HTMLTableDataCellElement>
      const symbol = cols[0].innerText
      const name = cols[1].innerText
      const lastPrice = parseNum(cols[2].innerText)
      const change = parseNum(cols[3].innerText)
      const changeRate = parseNum(cols[4].innerText)
      const time = new Date().toISOString()
      return {
        symbol,
        name,
        lastPrice,
        change,
        changeRate,
        time,
      }
    })
  })
}

export const handler: ScheduledHandler = async () => {
  const results = await launchPuppeteerBrowserSession([getDataFromPage])
  console.log(JSON.stringify(results, null, 2))
}