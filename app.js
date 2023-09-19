const express = require("express");

const mongoose = require("mongoose");

const helmet = require("helmet");

const cors = require("cors");

const { limiter } = require("./middlewares/rateLimiter");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB");
    console.log(r);
  },
  (e) => console.log("DB error", e),
);

app.use(helmet());
app.use(limiter);
app.use(cors());

const routes = require("./routes");

app.use((req, res, next) => {
  req.user = {
    _id: "650505f494a10e487429ae0f", // _id of test user
  };
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
