const authABL = require("./abl/auth");

exports.register = async (req, res) => {
  try {
    const result = await authABL.register(req.body); // předáme req.body jako dtoIn
    res.status(201).json(result);
  } catch (err) {
    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({ validationError: err.validationError });
    }
    res.status(400).json({ error: err.message });
  }
};
