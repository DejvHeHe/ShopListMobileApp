const shopList = require("../abl/shopList");

// helper pro error response
const handleError = (res, err) => {
  const message = err.message || "Nastala chyba";
  const code = err.code || "unknown_error";
  res.status(400).json({ message, code });
};

// CREATE new shopping list
exports.create = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.create(dtoIn);
    res.status(201).json(result);
  } catch (err) {
    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({ validationError: err.validationError });
    }
    handleError(res, err);
  }
};

// LIST shopping lists
exports.list = async (req, res) => {
  try {
    const dtoIn = { userId: req.user.userId };
    const result = await shopList.list(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

// ADD ITEM
exports.addItem = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.addItem(dtoIn);
    res.status(201).json(result);
  } catch (err) {
    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({ validationError: err.validationError });
    }
    handleError(res, err);
  }
};

// UNCHECK ITEM
exports.uncheckItem = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.uncheckItem(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({ validationError: err.validationError });
    }
    handleError(res, err);
  }
};

// REMOVE SHOPLIST
exports.remove = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.remove(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({ validationError: err.validationError });
    }
    handleError(res, err);
  }
};

// UPDATE SHOPLIST
exports.update = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.update(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({ validationError: err.validationError });
    }
    handleError(res, err);
  }
};

// EDIT ITEM
exports.editItem = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.editItem(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({ validationError: err.validationError });
    }
    handleError(res, err);
  }
};

// SET ARCHIVED
exports.setArchived = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.setArchived(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

// LIST ARCHIVED
exports.listArchived = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.listArchived(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

// REMOVE ITEM
exports.removeItem = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.removeItem(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

// SHARE SHOPLIST
exports.share = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.share(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

// LIST SHARED
exports.listShared = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.listShared(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

// VIEW SHARED TO
exports.viewSharedTo = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.viewSharedTo(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

// REMOVE FROM SHARE
exports.removeFromShare = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.removeFromShare(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};
