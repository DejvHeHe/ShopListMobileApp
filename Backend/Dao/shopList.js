require('dotenv').config(); // Load env vars
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');



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

async function create(dtoIn) {
    try {
        await ensureConnection();
        const result = await client
            .db("ShopListMobileApp")
            .collection("shopList")
            .insertOne(dtoIn);
        return result;
    } catch (err) {
        console.error("Create error:", err);
        throw err; // předáme dál do ABL
    }
}

async function list(ownerId)
{
    try{
        await ensureConnection();
        const result=await client
        .db("ShopListMobileApp")
        .collection("shopList")
        .find({ownerId:ownerId,isArchived:false})
        .toArray();

        return result;

    }
    catch(err)
    {
    console.log("List error:",err)
    
    return { success: false, error: err };

    }
}
async function addItem(item, shopListId) {
    try {
        await ensureConnection();

        // Přidání unikátního _id pro položku
        item._id = new ObjectId();

        const result = await client
            .db("ShopListMobileApp")
            .collection("shopList")
            .updateOne(
                { _id: new ObjectId(shopListId) },
                { $push: { items: item } }
            );

        return result;
    } catch (err) {
        console.log("Add item error:", err);
        return { success: false, error: err };
    }
}
async function uncheckItem(itemId, shopListId) {
    try {
        await ensureConnection();

        const result = await client
            .db("ShopListMobileApp")
            .collection("shopList")
            .updateOne(
                { 
                    _id: new ObjectId(shopListId),
                    "items._id": new ObjectId(itemId)
                },
                { 
                    $set: { "items.$.state": "checked" } // upravujeme správné pole
                }
            );

        return result;
    } catch (err) {
        console.log("Uncheck item error:", err);
        return { success: false, error: err };
    }
}



async function getShopList(_id)
{
     try{
        await ensureConnection();
         const objectId = new ObjectId(shopListID);
        const result=await client
        .db("ShopListMobileApp")
        .collection("shopList")
        .findOne({_id:objectId})

        return result;

    }
    catch(err)
    {
    console.log("Add item error:",err)
    
    return { success: false, error: err };

    }

}
module.exports = {
  
  create,
  list,
  getShopList,
  addItem,
  uncheckItem,
  
};