const listingService = require("../services/listingService");

// Simple role check: in real apps this comes from JWT/session
// For this assessment, pass ?admin=true in the request header
function isAdmin(req) {
  return req.headers["x-is-admin"] === "true";
}

const listingController = {
  async getListings(req, res) {
    try {
      const { price_min, price_max, beds, baths, type, keyword, suburb } =
        req.query;
      const limit = Math.min(parseInt(req.query.limit) || 10, 50);
      const offset = parseInt(req.query.offset) || 0;

      const result = await listingService.getListings({
        price_min,
        price_max,
        beds,
        baths,
        type,
        keyword,
        suburb,
        limit,
        offset,
        isAdmin: isAdmin(req),
      });

      res.json({
        ...result,
        page: Math.floor(offset / limit) + 1,
        total_pages: Math.ceil(result.total / limit),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getListingById(req, res) {
    try {
      const listing = await listingService.getListingById(
        req.params.id,
        isAdmin(req),
      );
      if (!listing) return res.status(404).json({ error: "Listing not found" });
      res.json(listing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = listingController;
