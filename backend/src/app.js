const express = require("express");
const cors = require("cors");
const listingRoutes = require("./routes/listings");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/listings", listingRoutes);

// Health check
app.get("/", (req, res) => res.json({ status: "ok" }));

module.exports = app;
