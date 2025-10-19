const express = require("express");
const router = express.Router();
const shopListController = require("../controllers/shopListController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, shopListController.create);
router.get("/list", authMiddleware, shopListController.list);
router.post("/addItem", authMiddleware, shopListController.addItem);
router.post("/uncheckItem", authMiddleware, shopListController.uncheckItem);

module.exports = router;
