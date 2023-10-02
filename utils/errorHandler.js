const {
  NOT_FOUND,
  BAD_REQUEST,
  DEFAULT,
  FORBIDDEN,
  UNAUTHORIZED,
} = require("./errors");

const handleError = (res, err) => {
  console.error(`${err}`);
  switch (err.name) {
    case "ForbiddenError":
      res
        .status(FORBIDDEN)
        .send({ message: `You are not allowed to make changes` });
      break;
    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({ message: `Data is not found` });
      break;
    case "CastError":
      res.status(BAD_REQUEST).send({ message: `Passed id is invalid` });
      break;
    case "DuplicateEmailError":
      res.status(err.statusCode).send({ message: err.message });
      break;
    case "AuthorizationError":
      res.status(UNAUTHORIZED).send({ message: `Incorrect email or password` });
      break;
    case "ValidationError":
      res.status(BAD_REQUEST).send({ message: `Passed invalid data!` });
      break;
    default:
      res
        .status(DEFAULT)
        .send({ message: `An error has occured on the server` });
      break;
  }
};

module.exports = { handleError };
