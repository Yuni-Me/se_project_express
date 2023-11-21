const { ForbiddenError } = require("./forbiddenError");
const { AuthorizationError } = require("./authorizationError");
const { DuplicateEmailError } = require("./duplicateEmailError");
const { DocumentNotFoundError } = require("./documentNotFoundError");
// const {
//   NOT_FOUND,
//   BAD_REQUEST,
//   DEFAULT,
//   FORBIDDEN,
//   UNAUTHORIZED,
// } = require("./errors");
const { CastError } = require("./castError");
const { ValidationError } = require("./validationError");
const { DefaultError } = require("./defaultError");

const handleError = (err) => {
  console.error(`${err}`);
  switch (err.name) {
    case "ForbiddenError":
      // res
      //   .status(FORBIDDEN)
      //   .send({ message: `You are not allowed to make changes` });
      new ForbiddenError();
      break;
    case "DocumentNotFoundError":
      // res.status(NOT_FOUND).send({ message: `Data is not found` });
      new DocumentNotFoundError();
      break;
    case "CastError":
      // res.status(BAD_REQUEST).send({ message: `Passed id is invalid` });
      new CastError();
      break;
    case "DuplicateEmailError":
      // res.status(err.statusCode).send({ message: err.message });
      new DuplicateEmailError();
      break;
    case "AuthorizationError":
      // res.status(UNAUTHORIZED).send({ message: `Incorrect email or password` });
      new AuthorizationError();
      break;
    case "ValidationError":
      // res.status(BAD_REQUEST).send({ message: `Passed invalid data!` });
      new ValidationError();
      break;
    default:
      // res
      //   .status(DEFAULT)
      //   .send({ message: `An error has occured on the server` });
      new DefaultError();
      break;
  }
};

module.exports = { handleError };
