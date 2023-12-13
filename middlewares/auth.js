const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

// const { handleError } = require("../utils/errorHandler");

const { AuthorizationError } = require("../utils/authorizationError");

const authUser = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AuthorizationError("Authorization Required!"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorizationError("Authorization Required!"));
  }
  req.user = payload;
  return next();
};

module.exports = {
  authUser,
};
