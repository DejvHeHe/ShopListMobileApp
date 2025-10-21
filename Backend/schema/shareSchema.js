const shareSchema = {
  type: "object",
  properties: {
    shopListId: { type: "string" },
    email: { type: "string" },
    userId:{ type: "string" },


  },
  required: ["shopListId","email","userId"],
  additionalProperties: false,
};

module.exports=shareSchema;