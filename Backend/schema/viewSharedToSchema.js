const viewSharedToSchema = {
  type: "object",
  properties: {
    shopListId: { type: "string" },
    userId:{ type: "string" },


  },
  required: ["shopListId","userId"],
  additionalProperties: false,
};

module.exports=viewSharedToSchema;