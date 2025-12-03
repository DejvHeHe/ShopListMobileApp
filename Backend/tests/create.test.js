const request = require("supertest");

const url = "http://localhost:5000";
const dtoIn={name:"pokus"}

describe("Tento test testuje POST /shoplist/create", () => {
    
    test("Happy day scénář ", async () => {
        const res = await request(url)
            .post("/shoplist/create")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGY1MGM1MzVhYTA5NWNmNzNhMTdmZGIiLCJpYXQiOjE3NjQ3NjQwNzEsImV4cCI6MTc2NzM1NjA3MX0.w1CIPeaU54euwt_07cB-bJa_kN6cdUaoe-qO_xAcLdE"
            )
            .send(dtoIn)
        
        expect(res.status).toBe(201);
        
       

        
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
