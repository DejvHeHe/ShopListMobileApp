const request = require("supertest");

const url = "http://localhost:5000";

describe("Tento test testuje GET /shoplist/get", () => {
    
    test("Happy day scénář — existující ShopList", async () => {
        const res = await request(url)
            .get("/shoplist/get")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
            )
            .query({ shopListId: "692ac5e2db30dca6d33a9ae6" });

        
        expect(res.status).toBe(200);
        
       
        expect(res.body).toHaveProperty("name");

        
    });


    test("ShopList neexistuje — nevalidní ID", async () => {
        const res = await request(url)
            .get("/shoplist/get")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
            )
            .query({ shopListId: "69076fde17ae8617c2800c93" });

        
        expect(res.status).toBe(400);        
        expect(res.body.message).toBe("ShopList neexistuje");
    });
    test("Uživatel není member", async () => {
        const res = await request(url)
            .get("/shoplist/get")
            .set(
                "Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY2MmJlMzcyNjcxYzg0ZWM2YjZkZDIiLCJpYXQiOjE3NjQ3NjcyMTksImV4cCI6MTc2NzM1OTIxOX0.ixLXtOL7vg_SnpMSLmbe1rEK9xcBgvS6mw0nhSolCUo"
                
            )
            .query({ shopListId: "692ac5e2db30dca6d33a9ae6" });

        
        expect(res.status).toBe(400);        
        expect(res.body.message).toBe("Nejste členem shoplistu");
    });

});
