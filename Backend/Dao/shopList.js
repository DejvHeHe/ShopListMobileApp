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
        dtoIn.ownerId=new ObjectId(dtoIn.ownerId)
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
        .find({ownerId:new ObjectId(ownerId),isArchived:false})
        .toArray();

        return result;

    }
    catch(err)
    {
    console.log("List error:",err)
    
    return { success: false, error: err };

    }
}
async function listArchived(ownerId)
{
    try{
        await ensureConnection();
        const result=await client
        .db("ShopListMobileApp")
        .collection("shopList")
        .find({ownerId:ownerId,isArchived:true})
        .toArray();

        return result;

    }
    catch(err)
    {
    console.log("List archived error:",err)
    
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
async function uncheckItem(shopListId,itemId) {
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



async function getShopList(shopListId)
{
     try{
        await ensureConnection();
        const objectId = new ObjectId(shopListId);
        const result=await client
        .db("ShopListMobileApp")
        .collection("shopList")
        .findOne({_id:objectId})
        

        return result;

    }
    catch(err)
    {
    console.log("Get shopList err:",err)
    
    return { success: false, error: err };

    }

}
async function remove(shopListId) {
    try{
        await ensureConnection();
        const objectId = new ObjectId(shopListId);
        const result=await client
        .db("ShopListMobileApp")
        .collection("shopList")
        .deleteOne({_id:objectId})

        return result;

    }
    catch(err)
    {
        console.log("Delete shopList err:",err)
    
        return { success: false, error: err };

    }
    
}
async function update(shopListId,newName) {
    try {
        await ensureConnection();

        const result = await client
            .db("ShopListMobileApp")
            .collection("shopList")
            .updateOne(
                { 
                    _id: new ObjectId(shopListId),
                },
                { 
                    $set: { name: newName } // upravujeme správné pole
                }
            );

        return result;
    } catch (err) {
        console.log("Update shopList error:", err);
        return { success: false, error: err };
    }
}
async function editItem(shopListId,itemId,newName,newCount) {
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
                    $set: { "items.$.name": newName,"items.$.count":newCount } // upravujeme správné pole
                }
            );

        return result;
    } catch (err) {
        console.log("Edit item error:", err);
        return { success: false, error: err };
    }
}
async function setArchived(shopListId) {
    try {
        await ensureConnection();

        const result = await client
        .db("ShopListMobileApp")
        .collection("shopList")
        .updateOne(
            { _id: new ObjectId(shopListId) },
            [
            { $set: { isArchived: { $not: "$isArchived" } } }
            ]
        );


        return result;
    } catch (err) {
        console.log("Archive shopList error:", err);
        return { success: false, error: err };
    }
}
async function removeItem(shopListId,itemId) {
    try {
        await ensureConnection();

        const result = await client
        .db("ShopListMobileApp")
        .collection("shopList")
        .updateOne(
            { _id: new ObjectId(shopListId) },
            { $pull: { items: { _id: new ObjectId(itemId) } } }
        );


        return result;
    } catch (err) {
        console.log("Uncheck item error:", err);
        return { success: false, error: err };
    }
}
async function share(shopListId, email) {
  try {
        await ensureConnection();

        const result = await client
        .db("ShopListMobileApp")
        .collection("users")
        .updateOne(
            { email: email },
            { $push: { sharedShopList: shopListId } }
        );

        return result;
  } catch (err) {
    console.log("Share shopList error:", err);
    return { success: false, error: err };
  }
}
async function listShared(userId) {
  try {
    await ensureConnection();

    // Najdi uživatele podle userId
    const user = await client
      .db("ShopListMobileApp")
      .collection("users")
      .findOne({_id:new ObjectId(userId) });
    
    
    if (!user || !user.sharedShopList || user.sharedShopList.length === 0) {
      return [];
    }

    // Převeď ID na ObjectId, pokud jsou uložené jako stringy
    const ids = user.sharedShopList.map(id => new ObjectId(id));

    // Najdi všechny shoplisty, které odpovídají těmto ID
    const result = await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .find({ _id: { $in: ids } })
      .toArray();

    return result;
  } catch (err) {
    console.log("List shared error:", err);
    return { success: false, error: err };
  }
}
async function viewSharedTo(shopListId) {
  try {
    await ensureConnection();

    // Najdi uživatele podle userId
    const result = await client
      .db("ShopListMobileApp")
      .collection("users")
      .find({sharedShopList:shopListId})
      .toArray();   

    

    return result;
  } catch (err) {
    console.log("View shared to error:", err);
    return { success: false, error: err };
  }
}
async function removeFromShare(shopListId, removeId) {
  try {
        await ensureConnection();

        const result = await client
        .db("ShopListMobileApp")
        .collection("users")
        .updateOne(
            { _id: new ObjectId(removeId) },
            { $pull: { sharedShopList: shopListId } }
        );

        return result;
  } catch (err) {
    console.log("Remove from shared ShopList error:", err);
    return { success: false, error: err };
  }
}


module.exports = {
  
  create,
  list,
  getShopList,
  addItem,
  uncheckItem,
  remove,
  update,
  editItem,
  setArchived,
  listArchived,
  removeItem,
  share,
  listShared,
  viewSharedTo,
  removeFromShare
  
};