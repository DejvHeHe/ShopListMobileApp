const registerSchema = {
  type: "object",
  properties: {
    email: { 
      type: "string",
      maxLength: 30
    },
    password: { 
      type: "string", 
      maxLength: 30
    },
    name: { 
      type: "string",
      maxLength: 30
    }
  },
  required: ["email", "password", "name"],
  additionalProperties: false,
};

module.exports = registerSchema;
