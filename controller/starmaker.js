const puppeteer = require("puppeteer")
const starMakerScraper = async (message) => {
    console.log("mess", message)
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(message);
    await page.waitFor("source")
    const downloadLink = await page.evaluate(() => {
        return document.querySelector("source").getAttribute("src")
    })
    await browser.close()
    return downloadLink
    // axios({
    //     method: "get",
    //     url: downloadLink,
    //     responseType: "stream"
    // })
    // .then(function (response) {
    //     response.data.pipe(fs.createWriteStream("master.mp4"));
    //     console.log("downloaded")
    // });
}

module.exports = {
    starMakerScraper
}