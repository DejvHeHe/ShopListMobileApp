const updateSchema = {
  type: "object",
  properties: {
    shopListId: { 
      type: "string",
      maxLength: 30
    },
    newName: { 
      type: "string",
      maxLength: 30
    },
    userId: { 
      type: "string",
      maxLength: 30
    }
  },
  required: ["shopListId", "newName", "userId"],
  additionalProperties: false,
};

module.exports = updateSchema;
