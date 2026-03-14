const { test, after } = require("node:test");
const assert = require("node:assert");
const { sequelize } = require("../utils/db");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("boards are returned as json", async () => {
  await api
    .get("/api/boards")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all boards are returned", async () => {
  const response = await api.get("/api/boards");

  assert.strictEqual(response.body.length, 2);
});

test("a specific board is within the returned boards", async () => {
  const response = await api.get("/api/boards");

  const contents = response.body.map((e) => e.content);
  assert(contents.includes("HTML is easy"));
});

after(async () => {
  await sequelize.close();
});
