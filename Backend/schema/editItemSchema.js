const editItemSchema = {
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
    newName: { 
      type: "string",
      maxLength: 30
    },
    newCount: { 
      type: "integer"
    },
    userId: { 
      type: "string",
      maxLength: 30
    }
  },
  required: ["shopListId", "itemId", "userId", "newName", "newCount"],
  additionalProperties: false,
};

module.exports = editItemSchema;
