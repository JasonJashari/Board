const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const { sequelize } = require("../utils/db");
const supertest = require("supertest");
const app = require("../app");
const Board = require("../models/board");

const api = supertest(app);

const initialBoards = [
  {
    title: "HTML",
    content: "HTML is easy",
  },
  {
    title: "Browsers",
    content: "Browser can execute only JavaScript",
  },
];

beforeEach(async () => {
  await Board.destroy({
    where: {}, // delete all rows
  });
  const b1 = Board.build(initialBoards[0]);
  await b1.save();
  const b2 = Board.build(initialBoards[1]);
  await b2.save();
});

test("boards are returned as json", async () => {
  await api
    .get("/api/boards")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all boards are returned", async () => {
  const response = await api.get("/api/boards");

  assert.strictEqual(response.body.length, initialBoards.length);
});

test("a specific board is within the returned boards", async () => {
  const response = await api.get("/api/boards");

  const contents = response.body.map((e) => e.content);
  assert(contents.includes("HTML is easy"));
});

after(async () => {
  await sequelize.close();
});
