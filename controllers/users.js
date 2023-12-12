const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { CREATED } = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

// const { handleError } = require("../utils/errorHandler");

const { DuplicateEmailError } = require("../utils/duplicateEmailError");
const { ValidationError } = require("../utils/validationError");
const { AuthorizationError } = require("../utils/authorizationError");

// Create User
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        // throw new DuplicateEmailError();
        return next(new DuplicateEmailError(`Email already exists`));
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
            // handleError(err);
            if (err.name && err.name === "ValidationError") {
              next(new ValidationError("Passed invalid data!"));
            } else {
              next(err);
            }
          }),
      );
    })
    .catch((err) => {
      // handleError(err);
      next(err);
    });
};

const loginUser = (req, res, next) => {
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
      // handleError(err);
      next(new AuthorizationError("Incorrect email or password"));
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      // handleError(err);
      next(err);
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  // const userId = req.user.id;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      // handleError(err);
      next(err);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  loginUser,
  updateUser,
};
