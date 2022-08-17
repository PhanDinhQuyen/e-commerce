require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const { categoryRouter, userRouter, uploadRouter } = require("./routers");

const app = express();
app.use(
  compression({
    level: 6,
    chunkSize: 10 * 1024, // 10 megabytes
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(morgan("combined"));

//Router
app.use("/user", userRouter);
app.use("/api", categoryRouter);
app.get("/upload", uploadRouter);
//Connet to Mongoose
const URI = process.env.MONGODB_CONNECTION_URL;
mongoose.connect(
  URI,
  {
    autoIndex: false,
  },
  (err) => {
    if (err) throw new Error(err);
    console.log("Connected to Mongoose successfully");
  }
);

//Start server
const PORT = process.env.PORT || 3401;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});