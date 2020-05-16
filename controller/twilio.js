const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const sendMessage = (from, to, message) => {
    // console.log(from, to, message)
    client.messages
        .create({
            from: to,
            body: message,
            to: from
        })
        .then(message => console.log(message.sid));
}

module.exports = {
    sendMessage
}