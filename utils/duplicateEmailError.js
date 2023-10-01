const { CONFLICT } = require("./errors");

class DuplicateEmailError extends Error {
  constructor() {
    super();
    this.name = "DuplicateEmailError";
    this.statusCode = CONFLICT;
    this.message = `Email already exists`;
  }
}

module.exports = { DuplicateEmailError };
