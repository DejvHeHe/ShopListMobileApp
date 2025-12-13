const request = require("supertest");

const url = "http://localhost:5000";

describe("Tento test testuje GET /shoplist/list", () => {
    
    test("Happy day scénář", async () => {
        const res = await request(url)
            .get("/shoplist/list")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
            )

        
        expect(res.status).toBe(200);
        
       

        
    });


    
});
