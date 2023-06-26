require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const app = express();

const cors = require("cors");
const router = require("./routes/index");

const errorHadnler = require("./middlewares/errorHadnler");

const PORT = process.env.PORT || 4000;

const models = require("./models/models");

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHadnler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log("server has been started on port " + PORT)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
