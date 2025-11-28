const shopList = require("../abl/shopList");

// helper pro error response
const handleError = (res, err) => {
  const message = err.message || "Nastala chyba";
  const code = err.code || "unknown_error";
  res.status(400).json({ message, code });
};


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


exports.list = async (req, res) => {
  try {
    const dtoIn = { userId: req.user.userId };
    const result = await shopList.list(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};


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


exports.setArchived = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.setArchived(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};


exports.listArchived = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.listArchived(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};


exports.removeItem = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.removeItem(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};


exports.share = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.share(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};


exports.listShared = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.listShared(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

exports.viewSharedTo = async (req, res) => {
  try {
    const dtoIn = {
      shopListId: req.query.shopListID, 
      userId: req.user.userId
    };


    const result = await shopList.viewSharedTo(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};



exports.removeFromShare = async (req, res) => {
  try {
    const dtoIn = { ...req.body, userId: req.user.userId };
    const result = await shopList.removeFromShare(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

exports.get = async (req, res) => {
  try {
    const dtoIn = {
      shopListId: req.query.shopListId,
      userId: req.user.userId
    };
    const result = await shopList.get(dtoIn);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

