const createSchema = require("../schema/createSchema");
const addItemSchema = require("../schema/addItemSchema");
const uncheckItemSchema = require("../schema/uncheckItemSchema");
const removeSchema = require("../schema/removeSchema");
const updateSchema = require("../schema/updateSchema");
const editItemSchema = require("../schema/editItemSchema");
const setArchivedSchema = require("../schema/setAchivedSchema");
const removeItemSchema = require("../schema/removeItemSchema");
const shareSchema = require("../schema/shareSchema");
const viewSharedToSchema = require("../schema/viewSharedToSchema");
const removeFromShareSchema = require("../schema/removeFromShareSchema");
const dao = require("../dao/shopList");
const Ajv = require("ajv");
const ajv = new Ajv();

class shopList {
    // Get kontroluje, zda je user member nebo owner
    async get(dtoIn) {
        const shopList = await dao.getShopList(dtoIn.shopListId);
        if (!shopList) {
            throw { code: "shopListDoesNotExist", message: "ShopList neexistuje" };
        }
        const members = await dao.viewSharedTo(dtoIn.shopListId);
        const isMember = members.some(user => user._id.toString() === dtoIn.userId.toString());
        if (!isMember && shopList.ownerId.toString() !== dtoIn.userId.toString()) {
            throw { code: "youAreNotMember", message: "Nejste členem shoplistu" };
        }
        return shopList;
    }

    // Pouze existence a owner check pro funkce, které musí kontrolovat vlastníka
    async isOwner(dtoIn) {
        const shopList = await dao.getShopList(dtoIn.shopListId);
        if (!shopList) {
            throw { code: "shopListDoesNotExist", message: "ShopList neexistuje" };
        }
        if (shopList.ownerId.toString() !== dtoIn.userId.toString()) {
            throw { code: "shopListIsNotYours", message: "Nejste vlastníkem shoplistu" };
        }
        return shopList;
    }

    validate(dtoIn, schema) {
        const valid = ajv.validate(schema, dtoIn);
        if (!valid) {
            throw { code: "dtoInIsNotValid", validationError: ajv.errors };
        }
    }

    async create(dtoIn) {
        this.validate(dtoIn, createSchema);
        const shopList = {
            name: dtoIn.name,
            isArchived: false,
            ownerId: dtoIn.userId
        };
        return await dao.create(shopList);
    }

    async list(dtoIn) {
        return await dao.list(dtoIn.userId);
    }

    async listArchived(dtoIn) {
        return await dao.listArchived(dtoIn.userId);
    }

    async listShared(dtoIn) {
        return await dao.listShared(dtoIn.userId);
    }

    async viewSharedTo(dtoIn) {
        this.validate(dtoIn, viewSharedToSchema);
        const shopList = await this.get(dtoIn); // member nebo owner check
        return await dao.viewSharedTo(dtoIn.shopListId);
    }

    async addItem(dtoIn) {
        this.validate(dtoIn, addItemSchema);
        const shopList = await this.get(dtoIn); // member nebo owner
        if (shopList.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        const item = {
            name: dtoIn.itemName,
            count: dtoIn.count ?? 1,
            state: "unchecked",
        };
        return await dao.addItem(item, dtoIn.shopListId);
    }

    async uncheckItem(dtoIn) {
        this.validate(dtoIn, uncheckItemSchema);
        const shopList = await this.get(dtoIn); // member nebo owner
        if (shopList.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        return await dao.uncheckItem(dtoIn.shopListId, dtoIn.itemId);
    }

    async remove(dtoIn) {
        this.validate(dtoIn, removeSchema);
        const shopList = await this.isOwner(dtoIn); // jen owner
        return await dao.remove(dtoIn.shopListId);
    }

    async removeItem(dtoIn) {
        this.validate(dtoIn, removeItemSchema);
        const shopList = await this.get(dtoIn); // member nebo owner
        if (shopList.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        return await dao.removeItem(dtoIn.shopListId, dtoIn.itemId);
    }

    async update(dtoIn) {
        this.validate(dtoIn, updateSchema);
        const shopList = await this.isOwner(dtoIn); // jen owner
        if (shopList.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        return await dao.update(dtoIn.shopListId, dtoIn.newName);
    }

    async editItem(dtoIn) {
        this.validate(dtoIn, editItemSchema);
        const shopList = await this.get(dtoIn); // member nebo owner
        if (shopList.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        return await dao.editItem(dtoIn.shopListId, dtoIn.itemId, dtoIn.newName, dtoIn.newCount);
    }

    async setArchived(dtoIn) {
        this.validate(dtoIn, setArchivedSchema);
        const shopList = await this.isOwner(dtoIn); // jen owner
        return await dao.setArchived(dtoIn.shopListId);
    }

    async share(dtoIn) {
        this.validate(dtoIn, shareSchema);
        const shopList = await this.get(dtoIn); // member nebo owner
        if (shopList.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        return await dao.share(dtoIn.shopListId, dtoIn.email);
    }

    async removeFromShare(dtoIn) {
        this.validate(dtoIn, removeFromShareSchema);
        const shopList = await this.get(dtoIn); // member nebo owner
        if (shopList.ownerId.toString() !== dtoIn.userId.toString()) {
            if (dtoIn.userId.toString() !== dtoIn.removeId.toString()) {
                throw { code: "shopListIsNotYours", message: "Nejste vlastníkem shoplistu" };
            }
        }
        return await dao.removeFromShare(dtoIn.shopListId, dtoIn.removeId);
    }
}

module.exports = new shopList();
