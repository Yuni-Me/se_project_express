const { UNAUTHORIZED } = require("./errors");

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = UNAUTHORIZED;
    // this.message = `Incorrect email or password`;
  }
}

module.exports = { AuthorizationError };
