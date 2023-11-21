const { BAD_REQUEST } = require("./errors");

class CastError extends Error {
  constructor() {
    super();
    this.name = "CastError";
    this.statusCode = BAD_REQUEST;
    this.message = `Passed id is invalid`;
  }
}

module.exports = { CastError };
