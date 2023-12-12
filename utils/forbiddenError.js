const { FORBIDDEN } = require("./errors");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = FORBIDDEN;
    // this.message = `You are not allowed to make changes`;
  }
}

module.exports = { ForbiddenError };
