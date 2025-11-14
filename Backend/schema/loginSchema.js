const loginSchema = {
  type: "object",
  properties: {
    email: { 
      type: "string",
      maxLength: 30
    },
    password: {
      type: "string",
      maxLength: 30
    }
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = loginSchema;
