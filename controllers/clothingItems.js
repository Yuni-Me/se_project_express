const ClothingItem = require("../models/clothingItem");

const { handleError } = require("../utils/errorHandler");

const { CREATED } = require("../utils/errors");

const { ForbiddenError } = require("../utils/forbiddenError");

// create item
const createItem = (req, res) => {
  // console.log(req);
  // console.log(req.user);
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      handleError(err);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      handleError(err);
    });
};

const deleteItem = (req, res) => {
  console.log(req.user_id);
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      const owner = item.owner.toString();
      // console.log("Owner " + owner);
      // console.log("current user " + req.user._id);
      if (owner !== req.user._id) {
        try {
          // throw new ForbiddenError();

          new ForbiddenError();
        } catch (err) {
          handleError(err);
        }
      } else {
        ClothingItem.findByIdAndDelete(itemId)
          .orFail()
          .then(() => {
            console.log("Item was deleted");
            res.send({ data: item });
          })
          .catch((err) => {
            handleError(err);
          });
      }
    })
    .catch((err) => {
      handleError(err);
    });
};

const likeItem = (req, res) => {
  // console.log(req.user);
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
      handleError(err);
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
      handleError(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
