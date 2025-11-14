const uncheckItemSchema = {
  type: "object",
  properties: {
    shopListId: { 
      type: "string",
      maxLength: 30
    },
    itemId: { 
      type: "string",
      maxLength: 30
    },
    userId: { 
      type: "string",
      maxLength: 30
    }
  },
  required: ["shopListId", "itemId", "userId"],
  additionalProperties: false,
};

module.exports = uncheckItemSchema;
