const { NOT_FOUND } = require("./errors");

class DocumentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "DocumentNotFoundError";
    this.statusCode = NOT_FOUND;
    // this.message = `Data is not found`;
  }
}

module.exports = { DocumentNotFoundError };
