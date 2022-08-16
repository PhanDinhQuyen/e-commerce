require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const userRouter = require("./routers/userRouter");

const app = express();
app.use(
  compression({
    level: 6,
    chunkSize: 10 * 1000,
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

app.get("/", (req, res) => {
  const str = "Hello \n";
  res.send(str.repeat(100));
});

//Start server
const PORT = process.env.PORT || 3401;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
