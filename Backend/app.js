const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Import routerů
const authRouter = require("./routers/authRouter");
const shopListRouter = require("./routers/shopListRouter");


// Použití routerů
app.use("/auth", authRouter);
app.use("/shoplist", shopListRouter); // nebo zakomentuj, pokud ještě neexistuje

// Start serveru
app.listen(port, () => {
console.log(`Server běží na portu ${port}`);
});
