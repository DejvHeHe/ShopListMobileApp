const setArchivedSchema = {
  type: "object",
  properties: {
    shopListId: { 
      type: "string",
      maxLength: 30
    },
    userId: { 
      type: "string",
      maxLength: 30
    }
  },
  required: ["shopListId", "userId"],
  additionalProperties: false
};

module.exports = setArchivedSchema;
