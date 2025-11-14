const createSchema = {
  type: "object",
  properties: {
    name: { 
      type: "string",
      maxLength: 30
    },
    userId: { 
      type: "string",
      maxLength: 30
    }
  },
  required: ["name", "userId"],
  additionalProperties: false,
};

module.exports = createSchema;
