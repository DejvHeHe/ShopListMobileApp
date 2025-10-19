const createSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    userId:{ type: "string" }
  },
  required: ["name","userId"],
  additionalProperties: false,
};

module.exports=createSchema;