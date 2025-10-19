const auth = require("../abl/auth");

exports.register = async (req, res) => {
  try {
    const result = await auth.register(req.body); // předáme req.body jako dtoIn
    res.status(201).json(result);
  } catch (err) {
    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({ validationError: err.validationError });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await auth.login(req.body); // předáme req.body jako dtoIn
    res.status(201).json(result);
  } catch (err) {
    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({ validationError: err.validationError });
    }
    res.status(400).json({ error: err.message });
  }
};
