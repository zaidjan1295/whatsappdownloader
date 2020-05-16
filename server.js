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

const requestRouter = require("./controller")
const twilio = require("./controller/twilio")

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.use(expressStatusMonitor());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/messageReceived', async (req, res) => {
  const {From: from, To: to, Body: body} = req.body
  const response = await requestRouter.requestRouter(body)
  // console.log("resposen", response)
  twilio.sendMessage(from, to, response)
})

app.post('/messageSent', (req, res) => {
  // console.log("request", JSON.stringify(req))
})


app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});