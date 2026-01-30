const express = require("express");
const app = express();

app.use(express.json());

// ROUTES
const authorRoutes = require("./routes/authors");
const withdrawalRoutes = require("./routes/withdrawals");

// Root route (health check ONLY)
app.get("/", (req, res) => {
  res.json({ message: "Author Royalty API is running 🚀" });
});

// Mount routes
app.use("/authors", authorRoutes);
app.use("/withdrawals", withdrawalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
