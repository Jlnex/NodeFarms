const express = require("express");
const fs = require("fs");
const createHTML = require("./helpers/createHTML.js");

let overviewHTML = fs.readFileSync("./templates/overview.html", "utf-8");
let cardHTML = fs.readFileSync("./templates/card.html", "utf-8");

const cardsData = JSON.parse(fs.readFileSync("./dev-data/data.json", "utf-8"));

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Sunucuya hoşgeldiniz");
});

app.get("/overview", (req, res) => {
  const readyCards = cardsData
    .map((item) => createHTML(cardHTML, item))
    .join("");

  console.log(readyCards);

  overviewHTML = overviewHTML.replace("{%PRODUCT_CARDS%}", readyCards);

  res.status(200).send(overviewHTML);
});

app.get("/product", (req, res) => {
  let productHTML = fs.readFileSync("./templates/product.html", "utf-8");

  const productID = req.query.id;

  const searchProduct = cardsData.find((item) => item.id == productID);

  console.log("ARANAN ÜRÜNÜN VERİSİ: \n \n", searchProduct);

  productHTML = createHTML(productHTML, searchProduct);

  res.status(200).send(productHTML);
});

app.listen(4000, () => console.log("\nSUNUCU ÇALIŞMAYA BAŞLADI.\n"));
