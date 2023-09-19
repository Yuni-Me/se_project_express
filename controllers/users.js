const User = require("../models/user");

const { CREATED } = require("../utils/errors");

const { handleError } = require("../utils/errorHandler");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(CREATED).send({ data: user });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      handleError(res, err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
