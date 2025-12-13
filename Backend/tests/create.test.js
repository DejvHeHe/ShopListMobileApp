const request = require("supertest");
require("dotenv").config();
const url = "http://localhost:5000";
const dtoIn={name:"pokus"}
const AUTH_TOKEN = process.env.AUTH_TOKEN;

describe("Tento test testuje POST /shoplist/create", () => {
    
     test("Happy day scénář – create + remove", async () => {
        // CREATE
        const createRes = await request(url)
        .post("/shoplist/create")
        .set("Authorization", AUTH_TOKEN)
        .send({ name: "Test shoplist" });

        expect(createRes.status).toBe(201);
        // Vrací Mongo result → použij insertedId
        expect(createRes.body).toHaveProperty("insertedId");

        const shopListId = createRes.body.insertedId;

        // CLEANUP – REMOVE
        const removeRes = await request(url)
        .post("/shoplist/remove")
        .set("Authorization", AUTH_TOKEN)
        .send({ shopListId });

        expect(removeRes.status).toBe(200);
        expect(removeRes.body.result.deletedCount).toBe(1);
    });

    test("Nevalidní dtoIn ", async () => {
        const res = await request(url)
            .post("/shoplist/create")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
            )
            .send({name:"Pokus",extraProperty:1})
            
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("validationError")
        
       

        
    });


   
});
