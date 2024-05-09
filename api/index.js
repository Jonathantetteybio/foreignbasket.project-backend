const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const Product = require("./Products");
const Order = require("./Orders");
const User = require("./Users");
const app = express();
const port = process.env.PORT || 3005;

// Middlewares
app.use(express.json());
app.use(cors());

async function main() {
  await mongoose.connect(
    "mongodb+srv://jonathantetteybio:Naraways533@cluster0.prve1cv.mongodb.net/?retryWrites=true&w=majority"
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// API FOR SIGNUP
app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const encrypt_password = await bycrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  User.findOne({ email: email }).then((user) => {
    if (!user && email && password && fullName) {
      User.create(userDetail)
        .then(() => {
          res.send({ message: "Account successfully created" });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send({ warning: "Sign up failed. Kindly check your credentials" });
    }
  });
});

// API FOR LOGIN
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then(async (user) => {
    if (user) {
      const match = await bycrypt.compare(password, user.password);

      if (match) {
        const { fullName, email } = user;
        res.send({ fullName, email });
      } else {
        res.send({ error: "invalid Password" });
      }
    } else {
      res.send({ error: "Kindly check your login credentials" });
    }
  });
});

// ADD PRODUCT API
app.post("/products/add", (req, res) => {
  const productDetail = req.body;
  console.log("Product Detail >>>>", productDetail);

  Product.create(productDetail)
    .then(() => {
      res.send("Product successfully added");
    })
    .catch((err) => {
      res.send(err);
    });
});

// GETTING ALL PRODUCTS API
app.get("/products/get", (req, res) => {
  Product.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// API TO ADD ORDER DETAILS
app.post("/orders/add", (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const address = req.body.address;
  const email = req.body.email;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };

  Order.create(orderDetail)
    .then(() => {
      res.send("Order successfully added");
    })
    .catch((err) => {
      res.send(err);
    });
});

// API TO GET ORDER DETAILS
app.post("/orders/get", (req, res) => {
  console.log(req);
  const email = req.body.email;

  Order.find({ email: email })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
