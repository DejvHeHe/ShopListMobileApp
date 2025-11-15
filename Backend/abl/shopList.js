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
    async listArchived(dtoIn) {
        try {
            const result = await dao.listArchived(dtoIn.userId);
            return result;
        } catch (err) {
            console.error("Error in list archived:", err);
            throw err;
        }
    }
    async listShared(dtoIn) {
        try {
            const result = await dao.listShared(dtoIn.userId);
            return result;
        } catch (err) {
            console.error("Error in  shared list:", err);
            throw err;
        }
    }
    async viewSharedTo(dtoIn) {
        try {
            this.validate(dtoIn, viewSharedToSchema);
            const exist=await dao.getShopList(dtoIn.shopListId)
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
            const result = await dao.viewSharedTo(dtoIn.shopListId);
            
            await this.isMember(dtoIn,exist);
            return result
            
            
        } catch (err) {
            console.error("Error in view shared to:", err);
            throw err;
        }
    }

    async addItem(dtoIn) {
        try {
            this.validate(dtoIn, addItemSchema);


            // Ověř, že shoplist existuje
            const exist = await dao.getShopList(dtoIn.shopListId);
            if (!exist) {
                throw { code: "shopListDoesNotExist", message: "ShopList neexistuje" };
            }

            
            await this.isMember(dtoIn,exist);

            // Přidání položky
            const item = {
                name: dtoIn.itemName,
                count: dtoIn.count ? dtoIn.count : 1,
                state: "unchecked",
            };

            const result = await dao.addItem(item, dtoIn.shopListId);
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
            await this.isMember(dtoIn,exist);

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
            if(exist.ownerId.toString()!==dtoIn.userId)
            {
                throw { code: "shopListIsNotYours", message:"Nejste vlastníkem shopLIstu" };

            }
            const result=await dao.remove(dtoIn.shopListId);
            return result;

        }
        catch (err) {
            console.error("Error in remove shoplist:", err);
            throw err;
        }
    }
    async removeItem(dtoIn){
        try{
            this.validate(dtoIn,removeItemSchema);
            const exist=await dao.getShopList(dtoIn.shopListId);
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
            
            await this.isMember(dtoIn,exist);
            const result=await dao.removeItem(dtoIn.shopListId,dtoIn.itemId);
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
            if(exist.ownerId.toString()!==dtoIn.userId)
            {
                throw { code: "shopListIsNotYours", message:"Nejste vlastníkem shopLIstu" };

            }
            const result=await dao.update(dtoIn.shopListId,dtoIn.newName);
            return result;

        }
        catch (err) {
            console.error("Error in update shoplist:", err);
            throw err;
        }
    }
    async editItem(dtoIn){
        try{
            this.validate(dtoIn,editItemSchema);
            const exist=await dao.getShopList(dtoIn.shopListId);
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
            await this.isMember(dtoIn,exist);
            const result=await dao.editItem(dtoIn.shopListId,dtoIn.itemId,dtoIn.newName,dtoIn.newCount);
            return result;

        }
        catch (err) {
            console.error("Error in update shoplist:", err);
            throw err;
        }
    }
    async setArchived(dtoIn){
        try{
            this.validate(dtoIn,setArchivedSchema);
            const exist=await dao.getShopList(dtoIn.shopListId);
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
            if(exist.ownerId.toString()!==dtoIn.userId)
            {
                throw { code: "shopListIsNotYours", message:"Nejste vlastníkem shopLIstu" };

            }
            const result=await dao.setArchived(dtoIn.shopListId);
            return result;

        }
        catch (err) {
            console.error("Error in update shoplist:", err);
            throw err;
        }
    }
    async share(dtoIn){
        try{
            this.validate(dtoIn,shareSchema);
            const exist=await dao.getShopList(dtoIn.shopListId);
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
            if(exist.ownerId.toString()!==dtoIn.userId)
            {
                throw { code: "shopListIsNotYours", message:"Nejste vlastníkem shopLIstu" };

            }
            const result=await dao.share(dtoIn.shopListId,dtoIn.email);
            return result;

        }
        catch (err) {
            console.error("Error in share shoplist:", err);
            throw err;
        }
    }
    async removeFromShare(dtoIn){
        try{
            this.validate(dtoIn,removeFromShareSchema);
            const exist=await dao.getShopList(dtoIn.shopListId);
            if(!exist)
            {
                throw { code: "shopListDoesNotExist", message:"ShopList neexistuje" };
            }
           if (exist.ownerId.toString() !== dtoIn.userId) {
                if (dtoIn.userId !== dtoIn.removeId) {
                    throw { code: "shopListIsNotYours", message: "Nejste vlastníkem shoplistu" };
                }
                    await this.isMember(dtoIn,exist);
            }

            const result = await dao.removeFromShare(dtoIn.shopListId, dtoIn.removeId);
            return result;


        }
        catch (err) {
            console.error("Error in removeFromShare:", err);
            throw err;
        }
    }

    async isMember(dtoIn,exist)
    {
        const members = await dao.viewSharedTo(dtoIn.shopListId);
            const isSharedMember = members.some(
                (user) => user._id.toString() === dtoIn.userId.toString()
            );

            if (!isSharedMember && exist.ownerId.toString().toString() !== dtoIn.userId.toString()) {
                throw { code: "youAreNotMember", message: "Nejste členem shoplistu" };
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
