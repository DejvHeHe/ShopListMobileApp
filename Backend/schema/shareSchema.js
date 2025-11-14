const shareSchema = {
  type: "object",
  properties: {
    shopListId: { 
      type: "string",
      maxLength: 30
    },
    email: { 
      type: "string",
      maxLength: 30
    },
    userId: { 
      type: "string",
      maxLength: 30
    }
  },
  required: ["shopListId", "email", "userId"],
  additionalProperties: false,
};

module.exports = shareSchema;
``
