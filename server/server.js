const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT;
const authRouter = require("./routes/Auth");
const accountRouter = require("./routes/Account");
const productRouter = require("./routes/Product");
const receiptRouter = require("./routes/Receipt");
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

  allowedHeaders: [
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, 'X-CSRF-TOKEN",
  ],
};

app.use(express.json());
app.use(cors(corsOpts));
app.use(fileUpload());
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("server has been started on port: " + PORT);
});

app.use("/auth", authRouter);
app.use("/accounts", accountRouter);
app.use("/products", productRouter);
app.use("/receipts", receiptRouter);
