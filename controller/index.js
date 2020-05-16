const starmaker = require("./starmaker")
var Url = require('url-parse');
const requestRouter = async (message) => {
    const url = new Url(message);
    switch(url.host){
        case 'm.starmakerstudios.com':
            return await starmaker.starMakerScraper(message)
        default:
            return "Send Starmaker links only"
    }
}

module.exports = {
    requestRouter
}