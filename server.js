const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("expence-track", "root", "18092000", {
  host: "localhost",
  dialect: "mysql",
});

const Product = sequelize.define("product", {
  name: Sequelize.STRING,
  price: Sequelize.FLOAT,
});

sequelize.sync().then(() => {
  console.log("Table synced successfully.");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public.html");
});

app.post("/addproduct", (req, res) => {
  const { name, price } = req.body;

  Product.create({
    name: name,
    price: price,
  })
    .then((product) => {
      console.log("Product created successfully.");
      res.send("Product created successfully.");
    })
    .catch((err) => {
      console.error(err);
      res.send("Error creating product.");
    });
});

app.listen(3000)
