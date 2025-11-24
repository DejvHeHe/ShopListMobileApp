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
    async exist(shopListId) {
        const shopList = await dao.getShopList(shopListId);
        if (!shopList) {
            throw { code: "shopListDoesNotExist", message: "ShopList neexistuje" };
        }
        return shopList;
    }

    validate(dtoIn, schema) {
        const valid = ajv.validate(schema, dtoIn);
        if (!valid) {
            throw { code: "dtoInIsNotValid", validationError: ajv.errors };
        }
    }

    async isMember(dtoIn, exist) {
        const members = await dao.viewSharedTo(dtoIn.shopListId);
        const isSharedMember = Array.isArray(members) && members.some(
            (user) => user._id.toString() === dtoIn.userId.toString()
        );
        if (!isSharedMember && exist.ownerId.toString() !== dtoIn.userId.toString()) {
            throw { code: "youAreNotMember", message: "Nejste členem shoplistu" };
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
        const exist = await this.exist(dtoIn.shopListId);
        await this.isMember(dtoIn, exist);
        return await dao.viewSharedTo(dtoIn.shopListId);
    }

    async addItem(dtoIn) {
        this.validate(dtoIn, addItemSchema);
        const exist = await this.exist(dtoIn.shopListId);
        if (exist.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        await this.isMember(dtoIn, exist);
        const item = {
            name: dtoIn.itemName,
            count: dtoIn.count ?? 1,
            state: "unchecked",
        };
        return await dao.addItem(item, dtoIn.shopListId);
    }

    async uncheckItem(dtoIn) {
        this.validate(dtoIn, uncheckItemSchema);
        const exist = await this.exist(dtoIn.shopListId);
        if (exist.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        await this.isMember(dtoIn, exist);
        return await dao.uncheckItem(dtoIn.shopListId, dtoIn.itemId);
    }

    async remove(dtoIn) {
        this.validate(dtoIn, removeSchema);
        const exist = await this.exist(dtoIn.shopListId);
        if (exist.ownerId.toString() !== dtoIn.userId.toString()) {
            throw { code: "shopListIsNotYours", message: "Nejste vlastníkem shoplistu" };
        }
        return await dao.remove(dtoIn.shopListId);
    }

    async removeItem(dtoIn) {
        this.validate(dtoIn, removeItemSchema);
        const exist = await this.exist(dtoIn.shopListId);
        if (exist.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        await this.isMember(dtoIn, exist);
        return await dao.removeItem(dtoIn.shopListId, dtoIn.itemId);
    }

    async update(dtoIn) {
        this.validate(dtoIn, updateSchema);
        const exist = await this.exist(dtoIn.shopListId);
        if (exist.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        if (exist.ownerId.toString() !== dtoIn.userId.toString()) {
            throw { code: "shopListIsNotYours", message: "Nejste vlastníkem shoplistu" };
        }
        return await dao.update(dtoIn.shopListId, dtoIn.newName);
    }

    async editItem(dtoIn) {
        this.validate(dtoIn, editItemSchema);
        const exist = await this.exist(dtoIn.shopListId);
        if (exist.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        await this.isMember(dtoIn, exist);
        return await dao.editItem(
            dtoIn.shopListId,
            dtoIn.itemId,
            dtoIn.newName,
            dtoIn.newCount
        );
    }

    async setArchived(dtoIn) {
        this.validate(dtoIn, setArchivedSchema);
        const exist = await this.exist(dtoIn.shopListId);
        if (exist.ownerId.toString() !== dtoIn.userId.toString()) {
            throw { code: "shopListIsNotYours", message: "Nejste vlastníkem shoplistu" };
        }
        return await dao.setArchived(dtoIn.shopListId);
    }

    async share(dtoIn) {
        this.validate(dtoIn, shareSchema);
        const exist = await this.exist(dtoIn.shopListId);
        if (exist.isArchived) {
            throw { code: "shopListIsArchived", message: "ShopList je archivovaný" };
        }
        if (exist.ownerId.toString() !== dtoIn.userId.toString()) {
            throw { code: "shopListIsNotYours", message: "Nejste vlastníkem shoplistu" };
        }
        return await dao.share(dtoIn.shopListId, dtoIn.email);
    }

    async removeFromShare(dtoIn) {
        this.validate(dtoIn, removeFromShareSchema);
        const exist = await this.exist(dtoIn.shopListId);
        if (exist.ownerId.toString() !== dtoIn.userId.toString()) {
            if (dtoIn.userId.toString() !== dtoIn.removeId.toString()) {
                throw { code: "shopListIsNotYours", message: "Nejste vlastníkem shoplistu" };
            }
            await this.isMember(dtoIn, exist);
        }
        return await dao.removeFromShare(dtoIn.shopListId, dtoIn.removeId);
    }
}

module.exports = new shopList();
