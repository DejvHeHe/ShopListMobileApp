const removeFromShareSchema = {
  type: "object",
  properties: {
    shopListId: { type: "string" },
    removeId: { type: "string" },
    userId:{ type: "string" },


  },
  required: ["shopListId","removeId","userId"],
  additionalProperties: false,
};

module.exports=removeFromShareSchema;