const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("server has been started on port: " + PORT);
});
