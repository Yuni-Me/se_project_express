const express = require("express");

const mongoose = require("mongoose");

const helmet = require("helmet");

const cors = require("cors");

const routes = require("./routes");

const { limiter } = require("./middlewares/rateLimiter");

const { createUser, loginUser } = require("./controllers/users");

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

app.post("/signup", createUser);
app.post("/signin", loginUser);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
