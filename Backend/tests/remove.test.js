const request = require("supertest");
require("dotenv").config();
const url = "http://localhost:5000";
const AUTH_TOKEN = process.env.AUTH_TOKEN;

describe("Tento test testuje POST /shoplist/remove", () => {

    test("Uživatel není owner", async () => {
        const res = await request(url)
            .post("/shoplist/remove")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY2MmJlMzcyNjcxYzg0ZWM2YjZkZDIiLCJpYXQiOjE3NjQ3NjcyMTksImV4cCI6MTc2NzM1OTIxOX0.ixLXtOL7vg_SnpMSLmbe1rEK9xcBgvS6mw0nhSolCUo"
            )
            .send({ shopListId: "68f4fefcc8cf8247ed0fdfdf" });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Nejste vlastníkem shoplistu");
    });
    test("ShopList neexistuje", async () => {
        const res = await request(url)
            .post("/shoplist/remove")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
            )
            .send({ shopListId: "69076fde17ae8617c2800c93" });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("ShopList neexistuje");
    });
    test("Nevalidní dtoIn ", async () => {
            const res = await request(url)
                .post("/shoplist/remove")
                .set(
                    "Authorization",
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
                )
                .send({name:"Pokus",extraProperty:1})
                
            
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("validationError")
            
           
    
            
        });


     test("Happy day scénář – create → remove", async () => {
        // CREATE
        const createRes = await request(url)
        .post("/shoplist/create")
        .set("Authorization", AUTH_TOKEN)
        .send({ name: "To be removed" });

        const shopListId = createRes.body.insertedId;

        // REMOVE
        const removeRes = await request(url)
        .post("/shoplist/remove")
        .set("Authorization", AUTH_TOKEN)
        .send({ shopListId });

        expect(removeRes.status).toBe(200);
        expect(removeRes.body.result.deletedCount).toBe(1);
  });

    

    
});
