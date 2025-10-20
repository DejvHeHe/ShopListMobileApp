const editItemSchema = {
  type: "object",
  properties: {
    shopListId: { type: "string" },
    itemId: { type: "string" },
    newName: { type: "string" },
    newCount: { type: "integer" },
    userId:{ type: "string" }
  },
  required: ["shopListId","itemId","userId","newName","newCount"],
  additionalProperties: false,
};

module.exports=editItemSchema;