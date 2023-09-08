import request from "supertest";
import { describe, beforeAll, afterAll, test, expect } from "@jest/globals";
import { setupApp } from "../app";

let app: Awaited<ReturnType<typeof setupApp>>;
beforeAll(async () => {
  app = await setupApp();
  if (process.env.OPTIC_PROXY) {
    await app.listen({ port: 3050 });
    const originalAddress = app.server.address();
    const updatedAddress =
      typeof originalAddress === "string" || originalAddress === null
        ? process.env.OPTIC_PROXY
        : { ...originalAddress, port: new URL(process.env.OPTIC_PROXY).port };

    app = {
      ...app,
      server: {
        ...app.server,
        address: () => updatedAddress,
      } as any,
    };
  }
});

afterAll(async () => {
  if (process.env.OPTIC_PROXY) {
    await app.close();
  }
});

describe("book endpoints", () => {
  test("GET /books", async () => {
    const response = await request(app.server)
      .get("/books")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  test("POST /books", async () => {
    const response = await request(app.server)
      .post("/books")
      .send({
        name: "another-book",
        price: 10,
        author_id: "6nTxAFM5ck4Hob77hGQoL",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  test("GET /books/{bookId}", async () => {
    const response = await request(app.server)
      .get("/books/WjE9O1d8ELCb8POiOw4pn")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  test("PATCH /books/{bookId}", async () => {
    const response = await request(app.server)
      .patch("/books/WjE9O1d8ELCb8POiOw4pn")
      .send({
        price: 5,
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });
});

describe("author endpoints", () => {
  test("GET /authors", async () => {
    const response = await request(app.server)
      .get("/authors")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  test("POST /authors", async () => {
    const response = await request(app.server)
      .post("/authors")
      .send({
        name: "another author",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  test("GET /authors/{authorId}", async () => {
    const response = await request(app.server)
      .get("/authors/6nTxAFM5ck4Hob77hGQoL")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  test("PATCH /authors/{authorId}", async () => {
    const response = await request(app.server)
      .patch("/authors/6nTxAFM5ck4Hob77hGQoL")
      .send({
        name: "updated name",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });
});
