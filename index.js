import puppeteer from "puppeteer"

const main = async () => {
  const searchCLI = process.argv.length >= 3 ? process.argv[2] : "headphones"
  // headless: "new" => don't launch the window
  const browser = await puppeteer.launch({ headless: "new" })
  const page = await browser.newPage()
  await page.goto("https://google.com")
  // textarea title="Search"

  // x  await page.setViewport({width: 1400, height: 748})
  await page.waitForSelector('textarea[title="Search"]')
  // { delay: 100 } => gives type delay (testing purposes)
  await page.type('textarea[title="Search"]', searchCLI)

  // 543 312
  await page.screenshot({
    path: "./images/google-screenshot.jpg",
    // fullPage: true,
  })

  await page.click('input[value="Google Search"]')
  await page.waitForNavigation()
  // h 273,  24
  await page.screenshot({
    path: "./images/google-result.jpg",
    // fullPage: true,
    clip: { x: 24, y: 273, width: 543, height: 312 },
  })

  let getDescription = ""
  try {
    getDescription = await page.$eval("div > .kno-rdesc > span", (elem) => {
      return elem.innerText
    })
  } catch (error) {
    console.log("Element not found:", error.message)
  }

  console.log(getDescription)
  await browser.close()
}

const main2 = async () => {
  const url = "https://web.telegram.org/"

  const searchCLI = process.argv.length >= 3 ? process.argv[2] : "headphones"
  // headless: "new" => don't launch the window
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)
  await new Promise(resolve => setTimeout(resolve, 5000))
  await page.screenshot({
    path: "./images/telegram-screenshot.jpg",
    fullPage: true,
  })

  // textarea title="Search"

  // x  await page.setViewport({width: 1400, height: 748})
  // await page.waitForSelector('textarea[title="Search"]')
  // // { delay: 100 } => gives type delay (testing purposes)
  // await page.type('textarea[title="Search"]', searchCLI)

  // // 543 312
  // await page.screenshot({
  //   path: "./images/google-screenshot.jpg",
  //   // fullPage: true,
  // })

  // await page.click('input[value="Google Search"]')
  // await page.waitForNavigation()
  // // h 273,  24
  // await page.screenshot({
  //   path: "./images/google-result.jpg",
  //   // fullPage: true,
  //   clip: { x: 24, y: 273, width: 543, height: 312 },
  // })

  // let getDescription = ""
  // try {
  //   getDescription = await page.$eval("div > .kno-rdesc > span", (elem) => {
  //     return elem.innerText
  //   })
  // } catch (error) {
  //   console.log("Element not found:", error.message)
  // }

  // console.log(getDescription)
  await browser.close()
}

main2()
