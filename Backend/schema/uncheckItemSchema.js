const uncheckItemSchema = {
  type: "object",
  properties: {
    shopListId: { type: "string" },
    itemId: { type: "string" },
    userId:{ type: "string" }
  },
  required: ["shopListId","itemId","userId"],
  additionalProperties: false,
};

module.exports=uncheckItemSchema;