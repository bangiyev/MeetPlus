require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const requestRoutes = require("./routes/requests");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/events", requestRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`now listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
