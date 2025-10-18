const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// import controllerů
const shopListController = require("/Controllers/shopListController");
const authController = require("/Controllers/authController");

// endpointy
app.use("/shoplist", shopListController);
app.use("/auth", authController);

// start serveru
app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});
