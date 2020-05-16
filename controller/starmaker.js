const starMakerScraper = async (req, res) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://m.starmakerstudios.com/d/playrecording?app=sm&from_user_id=6755399375119253&is_convert=true&recordingId=6755399308749310&share_type=whatsapp');
    await page.waitFor("source")
    const downloadLink = await page.evaluate(() => {
        return document.querySelector("source").getAttribute("src")
    })
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