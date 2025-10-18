const schema=require("./Schema/authShema")
const dao=require("./Dao/auth")
const Ajv = require("ajv");
const ajv = new Ajv();
const bcrypt = require('bcryptjs');

class Auth{
    
   async register(dtoIn)
    {
        this.validate(dtoIn)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(dtoIn.password, saltRounds);

        const userDoc = {
        email: dtoIn.email,
        passwordHash: hashedPassword,
        createdAt: new Date()
        };


    }

    async login(dtoIn)
    {
        this.validate(dtoIn)

    }
    validate(dtoIn)
    {
        const valid=ajv.validate(schema,dtoIn)
        if(!valid)
        {
            throw { code: "dtoInIsNotValid", validationError: ajv.errors };
        }

    }
}