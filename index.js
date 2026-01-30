const express = require("express");
const cors = require("cors");

const authorRoutes = require("./routes/authors");
const withdrawalRoutes = require("./routes/withdrawals");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS (REQUIRED)
app.use(cors());

// ✅ JSON body parser
app.use(express.json());

// ✅ Routes
app.use("/authors", authorRoutes);
app.use("/withdrawals", withdrawalRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ message: "Author Royalty API is running 🚀" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
