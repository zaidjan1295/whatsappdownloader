const puppeteer = require("puppeteer")
const starMakerScraper = async (message) => {
    console.log("mess", message)
    const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox']});
    try {
        const page = await browser.newPage();
        await page.goto(message);
        await page.waitFor("source", {timeout: 10000})
        const downloadLink = await page.evaluate(() => {
            return document.querySelector("source").getAttribute("src")
        })
        await browser.close()
        return downloadLink
    } catch(e) {
        await browser.close()
        return "Something went wrong while parsing"
    }
    
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