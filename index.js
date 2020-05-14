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
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const app = express();

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.use(expressStatusMonitor());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// (async () => {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();
//     await page.goto('https://m.starmakerstudios.com/d/playrecording?app=sm&from_user_id=6755399375119253&is_convert=true&recordingId=6755399308749310&share_type=whatsapp');
//     await page.waitFor("source")
//     const downloadLink = await page.evaluate(() => {
//       return document.querySelector("source").getAttribute("src")
//     })
//     axios({
//       method: "get",
//       url: downloadLink,
//       responseType: "stream"
//     })
//     .then(function (response) {
//       response.data.pipe(fs.createWriteStream("master.mp4"));
//       console.log("downloaded")
//     });
// })();

app.post('/messageReceived', (req, res) => {
  console.log("request", req)
})
app.post('/messageSent', (req, res) => {
  console.log("request", req)

})


client
  .messages
  .create({
     from: 'whatsapp:+14155238886',
     body: `It's taco time!`,
     to: 'whatsapp:+919886406126'
   })
  .then(message => console.log(message.sid))
  .catch(err => {
    throw(err)
  })


  app.listen(port = 8000, () => {
    console.log("serevr started at port", port)
  })