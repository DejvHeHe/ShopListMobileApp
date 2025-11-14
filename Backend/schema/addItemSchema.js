const addItemSchema = {
  type: "object",
  properties: {
    shopListId: { 
      type: "string",
      maxLength: 30
    },
    itemName: { 
      type: "string",
      maxLength: 30
    },
    userId: { 
      type: "string",
      maxLength: 30
    },
    count: { 
      type: "integer"
    }
  },
  required: ["shopListId", "itemName", "userId"],
  additionalProperties: false,
};

module.exports = addItemSchema;
