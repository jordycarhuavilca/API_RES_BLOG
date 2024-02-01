const { OAuth2Client } = require("google-auth-library");

const model = require("../database/models/user");
const { userRepos } = require("../repos/user.repos");
const { user_service } = require("../services/user.service");
const userRepository = new userRepos(model);
const userService = new user_service(userRepository);
const authHelper = require('../helpers/authHelper.js')
const constant = require('../utils/constant.js')

const redirectURL = `http://localhost:${process.env["NODE_PORT1"]}/auth/google/callback`;
const oAuth2Client = new OAuth2Client(
  process.env["GOOGLE_CLIENT_ID"],
  process.env["GOOGLE_CLIENT_SECRET"],
  redirectURL
);

const generateAuthUrl = (req, res) => {
  // Generate the url that will be used for the consent dialog.

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email", "openid"],
    prompt: "consent",
  });
  res.redirect(authorizeUrl);
};

const setCredentials  = async (req, res) => {
  try {
    const code = req.query.code;

    const tokens = await authHelper.getToken(oAuth2Client,code)
    
    const payload = await authHelper.getPayload(oAuth2Client,tokens.id_token)
    
    const userId = payload.sub
    const refresh_token = tokens.refresh_token
    
    const user = await userService.getUser(userId);
    if (user.length == 0) await userService.addUser(payload,refresh_token);
    else await userService.updateUser(payload,userId,refresh_token)

    const clientPayload = {
      sub : payload.sub,
      email : payload.email,
      name : payload.name,
      picture : payload.picture
    }

    authHelper.setSchToGetNewToken(oAuth2Client,user,tokens.expiry_date)

    req.session.user = tokens

    res.cookie("token", tokens.id_token, {
      httpOnly: true,
    });
    res.cookie("payload",clientPayload);
    res.redirect(303,process.env.BASEURL);

  } catch (err) {
    console.log("Error logging in with OAuth2 user", err.message);
    res.redirect("http://localhost:5173/");
  }
};

const logout = (req,res)=>{

  res.clearCookie("token")
  res.clearCookie("payload")

  req.session.destroy((err) => {
    if (err) {
      console.log(err.message)
      const {message,statusCode} = constant.serverError
      res.status(statusCode).json({message : message})
    } else {
      const {message,statusCode} = constant.success
      res.status(statusCode).json({message : message})
    }
  });
  console.log("session2 " +JSON.stringify(req.session))
}

module.exports = {
  generateAuthUrl,
  setCredentials,
  logout
};
