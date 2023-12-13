const { NOT_FOUND } = require("./errors");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = NOT_FOUND;
    // this.message = `Data is not found`;
  }
}

module.exports = { NotFoundError };
