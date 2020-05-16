const starmaker = require("./starmaker")
var Url = require('url-parse');
const requestRouter = async (message) => {
    try {
        const url = new Url(message);
        switch(url.host){
            case 'm.starmakerstudios.com':
                return await starmaker.starMakerScraper(message)
            default:
                return "Send Starmaker links only"
        }
    } catch (e) {
        return "Something Went Wrong"
    }
    
}

module.exports = {
    requestRouter
}