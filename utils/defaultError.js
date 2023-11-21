const { DEFAULT } = require("./errors");

class DefaultError extends Error {
  constructor() {
    super();
    this.name = "ServerError";
    this.statusCode = DEFAULT;
    this.message = `An error has occured on the server`;
  }
}

module.exports = { DefaultError };
