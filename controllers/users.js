const User = require("../models/user");
const { OK, CREATED } = require("../utils/errors");
const { handleError } = require("../utils/errorHandler");
const resource = "user";

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.status(CREATED).send({ data: user });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => {
      handleError(res, err);
    });
};

const getUser = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .orFail()
    .then((user) => {
      console.log(user);
      res.status(OK).send({ data: user });
    })
    .catch((err) => {
      handleError(res, err);
    });
};
// const deleteItem = (req, res) => {
//   const { itemId } = req.params;

//   console.log(itemId);
//   ClothingItem.findByIdAndDelete(itemId)
//     .orFail()
//     .then((item) => res.status(200).send(item))
//     .catch((e) => {
//       res.status(500).send({ message: "Error from deleteItem", e });
//     });
// };

// const updateCurrentUser = (req, res) => {
//   const { name, avatar } = req.body;

//   User.findByIdAndUpdate(userId, { $set: { imageURL } })
//     .orFail()
//     .then((user) => res.status(200).send({ data: user }))
//     .catch((e) => {
//       res.status(500).send({ message: "Error from updateUser", e });
//     });
// };

// const deleteItem = (req, res) => {
//   const { itemId } = req.params;

//   console.log(itemId);
//   ClothingItem.findByIdAndDelete(itemId)
//     .orFail()
//     .then((item) => res.status(200).send({}))
//     .catch((e) => {
//       res.status(500).send({ message: "Error from deleteItem", e });
//     });
// };

module.exports = {
  getUsers,
  getUser,
  createUser,
};
