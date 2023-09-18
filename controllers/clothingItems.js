const ClothingItem = require("../models/clothingItem");
const { handleError } = require("../utils/errorHandler");
const { OK, CREATED, NO_CONTENT } = require("../utils/errors");
const resource = "item";

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      handleError(res, err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      console.log("Item was deleted");
      res.status(NO_CONTENT).send(item);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((like) => {
      res.status(OK).send(like);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((dislike) => {
      res.status(OK).send(dislike);
    })
    .catch((e) => {
      handleError(res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
