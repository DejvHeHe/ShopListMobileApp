const auth = require("../abl/auth");

exports.register = async (req, res) => {
  try {
    const result = await auth.register(req.body); // předáme req.body jako dtoIn
    return res.status(201).json({
      success: true,
      message: "User successfully registered",
      user: result
    });
  } catch (err) {
    console.error("Error in register controller:", err);

    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({
        error: true,
        code: err.code,
        validationError: err.validationError
      });
    }

    return res.status(400).json({
      error: true,
      code: err.code || "RegisterError",
      message: err.message || "An unknown error occurred during registration"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await auth.login(req.body); // předáme req.body jako dtoIn

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token
    });
  } catch (err) {
    console.error("Error in login controller:", err);

    if (err.code === "dtoInIsNotValid") {
      return res.status(400).json({
        error: true,
        code: err.code,
        validationError: err.validationError
      });
    }

    return res.status(400).json({
      error: true,
      code: err.code || "LoginError",
      message: err.message || "An unknown error occurred during login"
    });
  }
};
