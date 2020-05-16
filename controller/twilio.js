const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const sendMessage = (from, to, message) => {
    client.messages
    .create({
        from: 'whatsapp:+14155238886',
        body: 'Check you DPay wallet for updates!',
        to: 'whatsapp:+919886406126'
      })
    .then(message => console.log(message.sid));
}

module.exports = {
    sendMessage
}