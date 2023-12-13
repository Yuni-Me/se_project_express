const ClothingItem = require("../models/clothingItem");

// const { handleError } = require("../utils/errorHandler");

const { CREATED } = require("../utils/errors");

const { ForbiddenError } = require("../utils/forbiddenError");
const { NotFoundError } = require("../utils/notFoundError");
const { ValidationError } = require("../utils/validationError");

// create item
const createItem = (req, res, next) => {
  // console.log(req);
  // console.log(req.user);
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Passed invalid data!"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  console.log(req.user_id);
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("No card found with this id."))
    .then((item) => {
      const owner = item.owner.toString();
      // console.log("Owner " + owner);
      // console.log("current user " + req.user._id);
      if (owner !== req.user._id) {
        try {
          // throw new ForbiddenError();

          next(new ForbiddenError("You are not allowed to make changes"));
        } catch (err) {
          // handleError(err);
          next(err);
        }
      } else {
        ClothingItem.findByIdAndDelete(itemId)
          .orFail()
          .then(() => {
            console.log("Item was deleted");
            res.send({ data: item });
          })
          .catch((err) => {
            // handleError(err);
            next(err);
          });
      }
    })
    .catch((err) => {
      // handleError(err);
      next(err);
    });
};

const likeItem = (req, res, next) => {
  // console.log(req.user);
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("No card found with this id."))
    .then((like) => {
      res.send(like);
    })
    .catch((err) => {
      // handleError(err);
      next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("No card found with this id."))
    .then((dislike) => {
      res.send(dislike);
    })
    .catch((err) => {
      // handleError(err);
      next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
