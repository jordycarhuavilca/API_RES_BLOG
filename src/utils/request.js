const axios = require('axios')
const request = {
    doRequest : async (method,url,data) =>{

        const config = {
            method: method.toLowerCase(),
            url: url
        }
        
        if (data) {
            config.data = data
        }
    
        const response = await axios(config)
        return response.data
        
    }

}
module.exports = request