const removeFromShareSchema = {
  type: "object",
  properties: {
    shopListId: { 
      type: "string",
      maxLength: 30
    },
    removeId: { 
      type: "string",
      maxLength: 30
    },
    userId: { 
      type: "string",
      maxLength: 30
    }
  },
  required: ["shopListId", "removeId", "userId"],
  additionalProperties: false,
};

module.exports = removeFromShareSchema;
