const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { CREATED } = require("../utils/errors");

const { DuplicateEmailError } = require("../utils/duplicateEmailError");

const { AuthorizationError } = require("../utils/authorizationError");

const { ForbiddenError } = require("../utils/forbiddenError");

const { ValidationError } = require("../utils/validationError");

const { JWT_SECRET } = require("../utils/config");

const { handleError } = require("../utils/errorHandler");

// Create User
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        try {
          throw new DuplicateEmailError();
        } catch (err) {
          handleError(res, err);
        }
      }
      return bcrypt.hash(password, 10).then((hash) =>
        User.create({ name, avatar, email, password: hash })
          .then((newUser) => {
            res.status(CREATED).send({
              data: {
                name: newUser.name,
                avatar: newUser.avatar,
                email: newUser.email,
              },
            });
          })
          .catch((err) => {
            if (err.name && err.name === "ValidationError") {
              try {
                throw new ValidationError();
              } catch (e) {
                handleError(res, e);
              }
            }
            handleError(res, err);
          }),
      );
    })
    .catch((err) => {
      try {
        if (err.name && err.name === "ValidationError") {
          throw new ValidationError();
        }
      } catch (error) {
        handleError(res, err);
      }
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch(() => {
      try {
        throw new AuthorizationError();
      } catch (err) {
        handleError(res, err);
      }
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(() => {
      try {
        throw new ForbiddenError();
      } catch (err) {
        handleError(res, err);
      }
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  loginUser,
  updateUser,
};
