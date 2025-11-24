const express = require("express");
const router = express.Router();
const shopListController = require("../controllers/shopListController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, shopListController.create);
router.get("/list", authMiddleware, shopListController.list);
router.post("/addItem", authMiddleware, shopListController.addItem);
router.post("/uncheckItem", authMiddleware, shopListController.uncheckItem);
router.post("/remove", authMiddleware, shopListController.remove);
router.post("/update", authMiddleware, shopListController.update);
router.post("/editItem", authMiddleware, shopListController.editItem);
router.post("/setArchived", authMiddleware, shopListController.setArchived);
router.post("/removeItem", authMiddleware, shopListController.removeItem);
router.get("/listArchived", authMiddleware, shopListController.listArchived);
router.post("/share", authMiddleware, shopListController.share);
router.get("/listShared", authMiddleware, shopListController.listShared);
router.get("/viewSharedTo", authMiddleware, shopListController.viewSharedTo);
router.post("/removeFromShare", authMiddleware, shopListController.removeFromShare);
router.get("/get", authMiddleware, shopListController.get)

module.exports = router;
