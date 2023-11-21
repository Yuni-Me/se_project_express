const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const { handleError } = require("../utils/errorHandler");

const { AuthorizationError } = require("../utils/authorizationError");

const authUser = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    try {
      throw new AuthorizationError();
    } catch (err) {
      handleError(err);
    }
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    try {
      throw new AuthorizationError();
    } catch (err) {
      handleError(err);
    }
  }
  req.user = payload;
  return next();
};

module.exports = {
  authUser,
};
