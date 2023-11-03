const { OAuth2Client } = require("google-auth-library");
const model = require("../database/models/user");
const { userRepos } = require("../repos/user.repos");
const { user_service } = require("../services/user.service");
const userRepository = new userRepos(model);
const userService = new user_service(userRepository);
const { encrypt } = require("../lib/encrypt");
const { serverError } = require("../utils/constant.js");

const redirectURL = `http://localhost:${process.env["NODE_PORT1"]}/auth/google/callback`;
const oAuth2Client = new OAuth2Client(
  process.env["GOOGLE_CLIENT_ID"],
  process.env["GOOGLE_CLIENT_SECRET"],
  redirectURL
);

// const getTokenAgain = (userId) => {
//   const user = (await = userService.getUser(userId));
//   const { refreshToken } = user.data;
//   console.log("refreshToken " + refreshToken);
//   oAuth2Client.setCredentials({ refresh_token: refreshToken });
//   const accessToken = oAuth2Client.getAccessToken();
//   console.log("accessToken " + accessToken);
// };

const addUser = (payload) => {
  let hash = encrypt(payload.refresh_token);
  const { content, iv } = hash;
  refresh_tokenCrypted = `${iv},${content}`;
  const user = {
    userId: payload.sub,
    user: payload.email,
    nameUser: payload.given_name,
    family_name: payload.family_name,
    refreshToken: refresh_tokenCrypted,
    image: payload.picture,
  };

  userService.addUser(user);
};
const updateUser = (payload)=>{
  let hash = encrypt(payload.refresh_token);
  const { content, iv } = hash;
  refresh_tokenCrypted = `${iv},${content}`;
  const user = {
    userId: payload.sub,
    user: payload.email,
    nameUser: payload.given_name,
    family_name: payload.family_name,
    refreshToken: refresh_tokenCrypted,
    image: payload.picture,
  };

  userService.updateUser(user,payload.sub);
}

const generateAuthUrl = (req, res) => {
  // Generate the url that will be used for the consent dialog.

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email", "openid"],
    prompt: "consent",
  });
  res.redirect(authorizeUrl);
};

const getToken = async (req, res) => {
  
  const code = req.query.code;
  try {


    const { tokens } = await oAuth2Client.getToken(code);

    const info = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env["GOOGLE_CLIENT_ID"],
    });

    if (info) {
      const { payload } = info;
      payload.refresh_token = tokens.refresh_token;

      const user = await userService.getUser(payload.sub);
      if (!user.data) addUser(payload);
      else updateUser(payload)

      res.cookie("accessToken", tokens.id_token, {
        httpOnly: true,
      });
      res.redirect(303, "http://localhost:5173/");
    } else {
      res.redirect(403, "http://localhost:5173/");
    }
  } catch (err) {
    res.redirect(serverError.statusCode, "http://localhost:5173/");
    console.log("Error logging in with OAuth2 user", err);
  }
};

module.exports = {
  generateAuthUrl,
  getToken,
};
