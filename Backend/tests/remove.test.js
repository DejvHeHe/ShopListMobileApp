const request = require("supertest");

const url = "http://localhost:5000";

describe("Tento test testuje POST /shoplist/remove", () => {

    test("Uživatel není owner", async () => {
        const res = await request(url)
            .post("/shoplist/remove")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY2MmJlMzcyNjcxYzg0ZWM2YjZkZDIiLCJpYXQiOjE3NjQ3NjcyMTksImV4cCI6MTc2NzM1OTIxOX0.ixLXtOL7vg_SnpMSLmbe1rEK9xcBgvS6mw0nhSolCUo"
            )
            .send({ shopListId: "693043da6c745cb874fe0232" });

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


    test("Happy day scénář", async () => {
        const res = await request(url)
            .post("/shoplist/remove")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
            )
            .send({ shopListId: "693043da6c745cb874fe0232" });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("acknowledged", true); 
    });

    

    
});
