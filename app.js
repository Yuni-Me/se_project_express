require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const helmet = require("helmet");

const cors = require("cors");

const { errors } = require("celebrate");

const routes = require("./routes");

const { limiter } = require("./middlewares/rateLimiter");

const { createUser, loginUser } = require("./controllers/users");

// const errorHandler = require("./utils/errorHandler");
const { errorHandler } = require("./middlewares/error-handler");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const { validateUserBody, validateAuth } = require("./middlewares/validation");

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

app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signup", validateUserBody, createUser);
app.post("/signin", validateAuth, loginUser);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
