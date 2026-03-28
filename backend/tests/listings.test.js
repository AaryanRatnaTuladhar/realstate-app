const request = require("supertest");
const app = require("../src/app");

describe("GET /listings", () => {
  it("returns a list of listings", async () => {
    const res = await request(app).get("/listings");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("filters by price range", async () => {
    const res = await request(app).get(
      "/listings?price_min=500000&price_max=800000",
    );
    expect(res.status).toBe(200);
    res.body.data.forEach((l) => {
      expect(Number(l.price)).toBeGreaterThanOrEqual(500000);
      expect(Number(l.price)).toBeLessThanOrEqual(800000);
    });
  });

  it("hides internal_notes for non-admin users", async () => {
    const res = await request(app).get("/listings/1");
    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty("internal_notes");
  });

  it("shows internal_notes for admin users", async () => {
    const res = await request(app).get("/listings/1").set("x-is-admin", "true");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("internal_notes");
  });

  it("returns 404 for non-existent listing", async () => {
    const res = await request(app).get("/listings/99999");
    expect(res.status).toBe(404);
  });
});
