const addItemSchema = {
  type: "object",
  properties: {
    shopListId: { type: "string" },
    itemName: { type: "string" },
    userId:{ type: "string" },
    count: { type: "integer" }


  },
  required: ["shopListId","itemName","userId"],
  additionalProperties: false,
};

module.exports=addItemSchema;