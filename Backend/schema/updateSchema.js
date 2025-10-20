const addItemSchema = {
  type: "object",
  properties: {
    shopListId: { type: "string" },
    newName: { type: "string" },
    userId:{ type: "string" }
    
  },
  required: ["shopListId","newName","userId"],
  additionalProperties: false,
};

module.exports=addItemSchema;