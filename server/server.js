const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ mssg: "welcome" });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
