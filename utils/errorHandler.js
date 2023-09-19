const { NOT_FOUND, BAD_REQUEST, DEFAULT } = require("./errors");

const handleError = (res, err) => {
  console.error(`Error: ${err}`);
  switch (err.name) {
    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({ message: `Data is not found` });
      break;
    case "CastError":
      res.status(BAD_REQUEST).send({ message: `Passed id is invalid` });
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
