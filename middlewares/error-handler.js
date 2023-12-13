const { DEFAULT } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const { statusCode = DEFAULT, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === DEFAULT ? "An error has occured on the server" : message,
  });
  next();
};

module.exports = { errorHandler };
