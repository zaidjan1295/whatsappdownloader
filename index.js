const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const path = require('path');
const expressStatusMonitor = require('express-status-monitor');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });
const dotenv = require("dotenv")
const axios = require("axios")
const fs = require("fs")
dotenv.config();

const app = express();
const router = express.Router();

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.use(expressStatusMonitor());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://m.starmakerstudios.com/d/playrecording?app=sm&from_user_id=6755399375119253&is_convert=true&recordingId=6755399308749310&share_type=whatsapp');
    await page.waitFor("source")
    const downloadLink = await page.evaluate(() => {
      return document.querySelector("source").getAttribute("src")
    })
    axios({
      method: "get",
      url: downloadLink,
      responseType: "stream"
    })
    .then(function (response) {
      response.data.pipe(fs.createWriteStream("master.mp4"));
      console.log("downloaded")
    });
})();


// const products = await page.evaluate(() => {
//     const links = Array.from(document.querySelectorAll('.s-result-item'));
//     return links.map(link => {
//       if (link.querySelector(".a-price-whole")) {
//         return {
//           name: link.querySelector(".a-size-medium.a-color-base.a-text-normal").textContent,
//           url: link.querySelector(".a-link-normal.a-text-normal").href,
//           image: link.querySelector(".s-image").src,
//           price: parseFloat(link.querySelector(".a-price-whole").textContent.replace(/[,.]/g, m => (m === ',' ? '.' : ''))),
//         };
//       }
//     }).slice(0, 5);
//   });
  
//   console.log(products.sort((a, b) => {
//     return a.price - b.price;
//   }));
  