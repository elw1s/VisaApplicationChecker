const puppeteer = require('puppeteer')

async function start(){
    const browser = await puppeteer.launch()
    const codes = ["ISTA202201100009","ISTA202201030003"]
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0)
    await page.goto("https://frs.gov.cz/en/ioff/application-status", {waitUntil: 'domcontentloaded', timeout: 0})
    for(let i = 0; i < codes.length; i++){
        await page.type("#edit-ioff-zov", codes[i])
        console.log("A")
        await page.waitForSelector('#edit-submit-button')
        console.log("B")
        //await page.click("#edit-submit-button")
        console.log("C")
        await page.screenshot({path: '1.png'})
        await Promise.all([
            page.waitForNavigation(), // The promise resolves after navigation has finished
            page.click('#edit-submit-button'), // Clicking the link will indirectly cause a navigation
          ]);
        console.log("D")
        await page.screenshot({path: '2.png'})
        await page.waitForSelector('body > div.main-container.container > div > section > div.alert.alert-block.alert-success.messages.status')
        console.log("E")
        const clickedData = await page.$eval("body > div.main-container.container > div > section > div.alert.alert-block.alert-success.messages.status > ul > li:nth-child(1) > p > span > strong", el => el.textContent)
        console.log(codes[i])
        console.log(clickedData)
        await page.reload({waitUntil: 'domcontentloaded', timeout: 0})
    }
    await browser.close()
}

start()