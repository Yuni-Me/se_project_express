const ClothingItem = require("../models/clothingItem");

const { handleError } = require("../utils/errorHandler");

const { CREATED } = require("../utils/errors");

const { ForbiddenError } = require("../utils/forbiddenError");

const { ValidationError } = require("../utils/validationError");

// create item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      try {
        if (err.name && err.name === "ValidationError") {
          throw new ValidationError();
        }
      } catch (e) {
        handleError(res, e);
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      handleError(res, err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      const owner = item.owner.toString();
      if (owner !== req.user._id) {
        try {
          throw new ForbiddenError();
        } catch (err) {
          handleError(res, err);
        }
      } else {
        ClothingItem.findByIdAndDelete(itemId)
          .orFail()
          .then(() => {
            console.log("Item was deleted");
            res.send({ data: item });
          })
          .catch((err) => {
            handleError(res, err);
          });
      }
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
      res.send(like);
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
      res.send(dislike);
    })
    .catch((err) => {
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
