require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

// Ensure index on ownerId
async function ensureOwnerIdIndex() {
  await ensureConnection();
  await client
    .db("ShopListMobileApp")
    .collection("shopList")
    .createIndex({ ownerId: 1 });
}

// Call it once at startup
ensureOwnerIdIndex().catch(console.error);

async function create(dtoIn) {
  try {
    await ensureConnection();
    dtoIn.ownerId = new ObjectId(dtoIn.ownerId);
    dtoIn.isArchived = false;
    dtoIn.items = dtoIn.items || [];
    const result = await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .insertOne(dtoIn);
    return result;
  } catch (err) {
    console.error("Create error:", err);
    throw err;
  }
}

async function list(ownerId) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .find({ ownerId: new ObjectId(ownerId), isArchived: false })
      .toArray();
  } catch (err) {
    console.error("List error:", err);
    return { success: false, error: err };
  }
}

async function listArchived(ownerId) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .find({ ownerId: new ObjectId(ownerId), isArchived: true })
      .toArray();
  } catch (err) {
    console.error("List archived error:", err);
    return { success: false, error: err };
  }
}

async function getShopList(shopListId) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .findOne({ _id: new ObjectId(shopListId) });
  } catch (err) {
    console.error("Get shopList error:", err);
    return { success: false, error: err };
  }
}

async function addItem(item, shopListId) {
  try {
    await ensureConnection();
    item._id = new ObjectId();
    const result = await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .updateOne(
        { _id: new ObjectId(shopListId), isArchived: false },
        { $push: { items: item } }
      );
    return result;
  } catch (err) {
    console.error("Add item error:", err);
    return { success: false, error: err };
  }
}

async function uncheckItem(shopListId, itemId) {
  try {
    await ensureConnection();
    const result = await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .updateOne(
        { _id: new ObjectId(shopListId), isArchived: false, "items._id": new ObjectId(itemId) },
        { $set: { "items.$.state": "unchecked" } }
      );
    return result;
  } catch (err) {
    console.error("Uncheck item error:", err);
    return { success: false, error: err };
  }
}

async function remove(shopListId) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .deleteOne({ _id: new ObjectId(shopListId) });
  } catch (err) {
    console.error("Remove shopList error:", err);
    return { success: false, error: err };
  }
}

async function update(shopListId, newName) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .updateOne(
        { _id: new ObjectId(shopListId), isArchived: false },
        { $set: { name: newName } }
      );
  } catch (err) {
    console.error("Update shopList error:", err);
    return { success: false, error: err };
  }
}

async function editItem(shopListId, itemId, newName, newCount) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .updateOne(
        { _id: new ObjectId(shopListId), isArchived: false, "items._id": new ObjectId(itemId) },
        { $set: { "items.$.name": newName, "items.$.count": newCount } }
      );
  } catch (err) {
    console.error("Edit item error:", err);
    return { success: false, error: err };
  }
}

async function setArchived(shopListId) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .updateOne(
        { _id: new ObjectId(shopListId) },
        [{ $set: { isArchived: { $not: "$isArchived" } } }]
      );
  } catch (err) {
    console.error("Set archived error:", err);
    return { success: false, error: err };
  }
}

async function removeItem(shopListId, itemId) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .updateOne(
        { _id: new ObjectId(shopListId), isArchived: false },
        { $pull: { items: { _id: new ObjectId(itemId) } } }
      );
  } catch (err) {
    console.error("Remove item error:", err);
    return { success: false, error: err };
  }
}

async function share(shopListId, email) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("users")
      .updateOne(
        { email: email },
        { $push: { sharedShopList: shopListId } }
      );
  } catch (err) {
    console.error("Share shopList error:", err);
    return { success: false, error: err };
  }
}

async function listShared(userId) {
  try {
    await ensureConnection();
    const user = await client
      .db("ShopListMobileApp")
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user || !user.sharedShopList || user.sharedShopList.length === 0) return [];

    const ids = user.sharedShopList.map(id => new ObjectId(id));
    return await client
      .db("ShopListMobileApp")
      .collection("shopList")
      .find({ _id: { $in: ids }, isArchived: false })
      .toArray();
  } catch (err) {
    console.error("List shared error:", err);
    return { success: false, error: err };
  }
}

async function viewSharedTo(shopListId) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("users")
      .find({ sharedShopList: shopListId })
      .toArray();
  } catch (err) {
    console.error("View shared to error:", err);
    return { success: false, error: err };
  }
}

async function removeFromShare(shopListId, removeId) {
  try {
    await ensureConnection();
    return await client
      .db("ShopListMobileApp")
      .collection("users")
      .updateOne(
        { _id: new ObjectId(removeId) },
        { $pull: { sharedShopList: shopListId } }
      );
  } catch (err) {
    console.error("Remove from shared ShopList error:", err);
    return { success: false, error: err };
  }
}

module.exports = {
  create,
  list,
  listArchived,
  getShopList,
  addItem,
  uncheckItem,
  remove,
  update,
  editItem,
  setArchived,
  removeItem,
  share,
  listShared,
  viewSharedTo,
  removeFromShare
};
