const shopList = require("../abl/shopList");

// CREATE new shopping list
exports.create = async (req, res) => {
    try {
        // dtoIn obsahuje data z body + userId z middleware
        const dtoIn = { ...req.body, userId: req.user.userId };
        console.log(dtoIn);
        const result = await shopList.create(dtoIn);
        res.status(201).json(result);
    } catch (err) {
        if (err.code === "dtoInIsNotValid") {
            return res.status(400).json({ validationError: err.validationError });
        }
        res.status(400).json({ error: err.message });
    }
};

// LIST shopping lists
exports.list = async (req, res) => {
    try {
        const dtoIn = { userId: req.user.userId };
        const result = await shopList.list(dtoIn);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ADD ITEM to shopping list
exports.addItem = async (req, res) => {
    try {
        const dtoIn = { ...req.body, userId: req.user.userId };
        const result = await shopList.addItem(dtoIn);
        res.status(201).json(result);
    } catch (err) {
        if (err.code === "dtoInIsNotValid") {
            return res.status(400).json({ validationError: err.validationError });
        }
        res.status(400).json({ error: err.message });
    }
};

// UNCHECK ITEM in shopping list
exports.uncheckItem = async (req, res) => {
    try {
        const dtoIn = { ...req.body, userId: req.user.userId };
        const result = await shopList.uncheckItem(dtoIn);
        res.status(200).json(result);
    } catch (err) {
        if (err.code === "dtoInIsNotValid") {
            return res.status(400).json({ validationError: err.validationError });
        }
        res.status(400).json({ error: err.message });
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
        res.status(400).json({ error: err.message });
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
        res.status(400).json({ error: err.message });
    }
};
