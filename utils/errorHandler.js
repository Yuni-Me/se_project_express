const { NOT_FOUND, BAD_REQUEST, DEFAULT } = require("./errors");
const handleError = (res, err) => {
  // const text = "Only a test";
  console.error(`Error: ${err}`);
  // if (error.name === "ValidationError") {
  //   res.status(BAD_REQUEST).send({
  //     message: "Passed invalid data !",
  //   });
  // } else if (error.name === "CastError") {
  //   res.status(BAD_REQUEST).send({
  //     message: "Passed id is invalid",
  //   });
  // } else if (error.name === "DocumentNotFoundError") {
  //   res.status(NOT_FOUND).send({
  //     message: "Data is not found",
  //   });
  // } else {
  //   res.status(DEFAULT).send({
  //     message: "An error has occurred on the server.",
  //   });
  // }
  // if (err.name === "DocumentNotFoundError") {
  //   return res.status(NOT_FOUND).send({ message: `${resource} id ${req.params.id} couldn't be found` });
  // }
  switch (err.name) {
    case "DocumentNotFoundError":
      return res.status(NOT_FOUND).send({ message: `Data is not found` });
      break;
    case "CastError":
      return res.status(BAD_REQUEST).send({ message: `Passed id is invalid` });
      break;
    case "ValidationError":
      return res.status(BAD_REQUEST).send({ message: `Passed invalid data!` });
      break;
    default:
      return res
        .status(DEFAULT)
        .send({ message: `An error has occured on the server` });
      break;
  }
};

module.exports = { handleError };
