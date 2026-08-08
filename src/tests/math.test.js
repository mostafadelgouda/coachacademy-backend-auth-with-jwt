import { multiply } from "../functions/math.js";
import request from "supertest";
import app from "../../api/index.js";
test("multiplies two numbers", () => {
  expect(multiply(2, 3)).toBe(6);
});

test("GET /api/v1/posts returns 200", async () => {
  const res = await request(app).get("/api/v1/posts");
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body.posts)).toBe(true);
});
// run with: npx jest
