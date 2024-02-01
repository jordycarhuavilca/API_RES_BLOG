const encrypt = require("../lib/encrypt");
const cron = require('node-cron')
const moment = require('moment')
const request = require('../utils/request')

const authHelper = {
    
    verifyAccessToken : async(accessToken)=>{
       const token = await request.doRequest('get',`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`)
       return token
    },
    getToken : async (oAuth2Client,code)=>{
        const {tokens}  =  await oAuth2Client.getToken(code);
        return tokens
    },
    getPayload: async (oAuth2Client,id_token)=>{
        const {payload} =  await oAuth2Client.verifyIdToken({
            idToken: id_token,
            audience: process.env["GOOGLE_CLIENT_ID"],
        });
        return payload
    },
    getNewToken : (oAuth2Client,user) =>{
        const refresh_token = encrypt.decode(user.refreshToken)
        const newToken = ''

        oAuth2Client.setCredentials({
            refresh_token: refresh_token
        });
        
        oAuth2Client.on('tokens', (tokens) => {
            console.log("new Token " + tokens)
            newToken = tokens
        });
        return newToken
    },
    setSchToGetNewToken : (oAuth2Client,user,expiry_date)=>{
        const entireDate = moment(expiry_date)
        const time = entireDate.format('HH:mm:ss')
        // cron.schedule('* * * * * *', () => {
        //     getNewToken(oAuth2Client,user)
        // });
    }
}


module.exports = authHelper