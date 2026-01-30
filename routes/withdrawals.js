const express = require("express");
const router = express.Router();

const { authors, withdrawals } = require("../data/seedData");
const { calculateCurrentBalance } = require("../utils/calculations");

// 4️⃣ POST /withdrawals
router.post("/", (req, res) => {
  const { author_id, amount } = req.body;

  const author = authors.find(a => a.id === author_id);
  if (!author) return res.status(404).json({ error: "Author not found" });

  if (amount < 500)
    return res.status(400).json({ error: "Minimum withdrawal amount is ₹500" });

  const balance = calculateCurrentBalance(author_id);
  if (amount > balance)
    return res.status(400).json({ error: "Insufficient balance" });

  const withdrawal = {
    id: withdrawals.length + 1,
    author_id,
    amount,
    status: "pending",
    created_at: new Date().toISOString()
  };

  withdrawals.push(withdrawal);

  res.status(201).json({
    ...withdrawal,
    new_balance: calculateCurrentBalance(author_id)
  });
});

// 5️⃣ GET /authors/:id/withdrawals
router.get("/authors/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const result = withdrawals
    .filter(w => w.author_id === id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  res.json(result);
});

module.exports = router;
