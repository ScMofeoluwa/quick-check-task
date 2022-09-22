import supertest from "supertest";
import { DBSource } from "../../src/database/data-source";
import { factory } from "../factory";
import { app } from "../../src/main";

describe("/items", () => {
    beforeAll(async () => {
        await DBSource.initialize();
    });

    describe("GET /", () => {
        test("should return all items", async () => {
            const res = await supertest(app).get("/items");
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("data");
            expect(res.body).toHaveProperty("message");
            expect(res.body.data).not.toBeNull();
        });
    });

    describe("GET ?QUERY", () => {
        test("should return all items based on given query", async () => {
            const query = "HN";
            const res = await supertest(app).get(`/items?query=${query}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("data");
            expect(res.body).toHaveProperty("message");
            expect(res.body.data).not.toBeNull();
        });
    });

    describe("GET /:TYPE", () => {
        test("should return all items based on type", async () => {
            const res = await supertest(app).get("/items/job");
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("data");
            expect(res.body).toHaveProperty("message");
            expect(res.body.data).not.toBeNull();
        });
    });

    // describe("POST /", () => {
    //   test("create item", async() => {
    //     const item = factory.build("Item")
    //     const res = await supertest(app).post(`/items`).send(item)
    //     expect(res.status).toBe(201)
    //     // expect(res.body).toHaveProperty("data")
    //     // expect(res.body).toHaveProperty("message")
    //     // expect(res.body.data).not.toBeNull()
    //   })
    // })
});
