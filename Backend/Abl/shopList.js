const createSchema = require("../schema/createSchema");
const addItemSchema = require("../schema/addItemSchema");
const uncheckItemSchema = require("../schema/uncheckItemSchema");
const removeSchema = require("../schema/removeSchema");
const updateSchema = require("../schema/updateSchema");
const dao = require("../dao/shopList");
const Ajv = require("ajv");
const ajv = new Ajv();

class shopList {

    async create(dtoIn) {
        try {
            this.validate(dtoIn, createSchema);
            const shopList={
                name:dtoIn.name,
                isArchived:false,
                ownerId:dtoIn.userId
            }
            const result = await dao.create(shopList);
            return result;
        } catch (err) {
            // Můžeš logovat nebo zpracovat chybu
            console.error("Error in create:", err);
            throw err; // předání dál
        }
    }

    async list(dtoIn) {
        try {
            const result = await dao.list(dtoIn.userId);
            return result;
        } catch (err) {
            console.error("Error in list:", err);
            throw err;
        }
    }

    async addItem(dtoIn) {
        try {
            this.validate(dtoIn, addItemSchema);
            const exist=await dao.getShopList(dtoIn.shopListId)
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
            const item={
                name:dtoIn.itemName,
                count:dtoIn.count?dtoIn.count:1,
                state:"unchecked"
            }
            const result = await dao.addItem(item,dtoIn.shopListId);
            return result;
        } catch (err) {
            console.error("Error in addItem:", err);
            throw err;
        }
    }

    async uncheckItem(dtoIn) {
        try {
            this.validate(dtoIn, uncheckItemSchema);
            const exist=await dao.getShopList(dtoIn.shopListId)
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
            const result = await dao.uncheckItem(dtoIn.shopListId,dtoIn.itemId);
            return result;
        } catch (err) {
            console.error("Error in uncheckItem:", err);
            throw err;
        }
    }
    async remove(dtoIn){
        try{
            this.validate(dtoIn,removeSchema);
            const exist=await dao.getShopList(dtoIn.shopListId);
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
            const result=await dao.remove(dtoIn.shopListId);
            return result;

        }
        catch (err) {
            console.error("Error in remove shoplist:", err);
            throw err;
        }
    }
    async update(dtoIn){
        try{
            this.validate(dtoIn,updateSchema);
            const exist=await dao.getShopList(dtoIn.shopListId);
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
            const result=await dao.update(dtoIn.shopListId,dtoIn.newName);
            return result;

        }
        catch (err) {
            console.error("Error in update shoplist:", err);
            throw err;
        }
    }

    validate(dtoIn, schema) {
        const valid = ajv.validate(schema, dtoIn);
        if (!valid) {
            throw { code: "dtoInIsNotValid", validationError: ajv.errors };
        }
    }

    
}

module.exports = new shopList();
