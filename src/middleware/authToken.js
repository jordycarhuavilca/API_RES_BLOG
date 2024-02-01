const constant= require("../utils/constant");
const authHelper = require('../helpers/authHelper');


const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    
    const userSession = req.session.user

    if (userSession.id_token != token)  return res
    .status(constant.unauthorized.statusCode)
    .json({ message: constant.unauthorized.message});

    const response = await authHelper.verifyAccessToken(userSession.access_token)

    if (response.email_verified) {
      next()
    }

  } catch (err) {
    console.log(err.message)
    return res
      .status(constant.unauthorized.statusCode)
      .json({ message: constant.unauthorized.message });
  }
};

module.exports = verifyToken
