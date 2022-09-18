require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// const { faker } = require("@faker-js/faker");
// const { Product } = require("./src/models");

const {
  categoryRouter,
  userRouter,
  uploadRouter,
  productRouter,
} = require("./src/routers");

const app = express();
//Middleware
app.use(
  compression({
    level: 6,
    chunkSize: 10 * 1024, // 10 megabytes
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
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
app.use("/api", uploadRouter);
app.use("/api", productRouter);

// app.get("/createdata", async (req, res, next) => {
//   for (let i = 0; i < 50; i++) {
//     try {
//       const title = faker.commerce.productName();
//       const newProduct = new Product({
//         product_id: faker.random.alphaNumeric(5),
//         title: title,
//         price: Number(faker.commerce.price(1, 200)),
//         description: faker.commerce.productDescription(),
//         content: faker.lorem.lines(3),
//         image: {
//           url: `${faker.image.nature()}?random=${Date.now()}`,
//         },
//         category: faker.commerce.department(),
//         sold: Number(faker.random.numeric()),
//         lower_title: title.toLowerCase(),
//       });
//       newProduct.save();
//       res.redirect("/api/product");
//     } catch (e) {
//       console.log(e);
//     }
//   }
// });

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
