const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const { reqValidationError } = require("../utils/constant");
const googleVerifyToken = async (req, res, next) => {
  let token = req.cookies.accessToken;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env["GOOGLE_CLIENT_ID"],
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    if (payload) {
      next();
    } else {
      return res
        .status(reqValidationError.statusCode)
        .json({ message: reqValidationError.message });
    }
  } catch (err) {
    return res
      .status(reqValidationError.statusCode)
      .json({ message: reqValidationError.message });
  }
};

module.exports = {
  googleVerifyToken,
};
