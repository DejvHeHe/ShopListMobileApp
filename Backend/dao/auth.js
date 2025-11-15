require('dotenv').config(); // Load env vars
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');




const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Ensure DB connection
async function ensureConnection() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

async function ensureEmailUniqueIndex() {
  await client
    .db("ShopListMobileApp")
    .collection("auth")
    .createIndex({ email: 1 }, { unique: true });
}
async function register(userDoc) {
  try {
    await ensureConnection();
    await ensureEmailUniqueIndex();

    const result = await client
      .db("ShopListMobileApp")
      .collection("auth")
      .insertOne({email:userDoc.email,passwordHash:userDoc.passwordHash,createdAt:userDoc.createdAt});

    const userDb=await client
      .db("ShopListMobileApp")
      .collection("users")
      .insertOne({_id:new ObjectId(result.insertedId),name:userDoc.name,email:userDoc.email});

    return { success: true, userId: result.insertedId };
  } catch (err) {
    if (err.code === 11000) {
      return {
        success: false,
        error: "Email already registered.",
        code: "EmailAlreadyRegistered",
        message:"Email already registered.",
      };
    }

    console.error("Registration error:", err);
    return { success: false, error: "Something went wrong." };
  }
}

async function findByEmail(email)
{
  try{
    await ensureConnection()
    const user=await client
    .db("ShopListMobileApp")
    .collection("auth")
    .findOne({email})
    
    return user;

  }
  catch(err)
  {
    
    return { success: false, error: err };

  }
  



}

module.exports = { 
  register,
  findByEmail
  
    

 };
