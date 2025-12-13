const request = require("supertest");
require("dotenv").config();
const url = "http://localhost:5000";
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const dtoIn={shopListId: "692ac5e2db30dca6d33a9ae6",
  newName: "Nový název seznamu",}

describe("Tento test testuje POST /shoplist/update", () => {
    
    test("Happy day scénář – create → update → remove", async () => {
        // 1️⃣ CREATE
        const createRes = await request(url)
        .post("/shoplist/create")
        .set("Authorization", AUTH_TOKEN)
        .send({ name: "Old name" });

        expect(createRes.status).toBe(201);
        expect(createRes.body).toHaveProperty("insertedId");

        const shopListId = createRes.body.insertedId;

        // 2️⃣ UPDATE
        const updateRes = await request(url)
        .post("/shoplist/update")
        .set("Authorization", AUTH_TOKEN)
        .send({
            shopListId,
            newName: "New name"
        });

        expect(updateRes.status).toBe(200);
        expect(updateRes.body.result.matchedCount).toBe(1);

        // 3️⃣ REMOVE – CLEANUP
        const removeRes = await request(url)
        .post("/shoplist/remove")
        .set("Authorization", AUTH_TOKEN)
        .send({ shopListId });

        expect(removeRes.status).toBe(200);
        expect(removeRes.body.result.deletedCount).toBe(1);
   });
    test("Nevalidní dtoIn ", async () => {
        const res = await request(url)
            .post("/shoplist/update")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
            )
            .send({name:"Pokus",extraProperty:1})
            
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("validationError")
        
       

        
    });
    test("Uživatel není owner", async () => {
            const res = await request(url)
                .post("/shoplist/update")
                .set(
                    "Authorization",
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY2MmJlMzcyNjcxYzg0ZWM2YjZkZDIiLCJpYXQiOjE3NjQ3NjcyMTksImV4cCI6MTc2NzM1OTIxOX0.ixLXtOL7vg_SnpMSLmbe1rEK9xcBgvS6mw0nhSolCUo"
                )
                .send(dtoIn);
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Nejste vlastníkem shoplistu");
        });
    test("ShopList neexistuje", async () => {
            const res = await request(url)
                .post("/shoplist/update")
                .set(
                    "Authorization",
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
                )
                .send({ shopListId: "69076fde17ae8617c2800c93",newName:"Pokus2" });
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("ShopList neexistuje");
        });


   
});
