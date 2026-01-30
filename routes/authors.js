const express = require("express");
const router = express.Router();

const { authors, books, sales } = require("../data/seedData");
const { calculateTotalEarnings, calculateCurrentBalance } = require("../utils/calculations");

// 1️⃣ GET /authors
router.get("/", (req, res) => {
  res.json(
    authors.map(a => ({
      id: a.id,
      name: a.name,
      total_earnings: calculateTotalEarnings(a.id),
      current_balance: calculateCurrentBalance(a.id)
    }))
  );
});

// 2️⃣ GET /authors/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const author = authors.find(a => a.id === id);

  if (!author) return res.status(404).json({ error: "Author not found" });

  const authorBooks = books.filter(b => b.author_id === id);

  res.json({
    id: author.id,
    name: author.name,
    email: author.email,
    total_books: authorBooks.length,
    total_earnings: calculateTotalEarnings(id),
    current_balance: calculateCurrentBalance(id),
    books: authorBooks.map(book => {
      const totalSold = sales
        .filter(s => s.book_id === book.id)
        .reduce((sum, s) => sum + s.quantity, 0);

      return {
        id: book.id,
        title: book.title,
        royalty_per_sale: book.royalty,
        total_sold: totalSold,
        total_royalty: totalSold * book.royalty
      };
    })
  });
});

// 3️⃣ GET /authors/:id/sales
router.get("/:id/sales", (req, res) => {
  const id = parseInt(req.params.id);
  const author = authors.find(a => a.id === id);
  if (!author) return res.status(404).json({ error: "Author not found" });

  let result = [];

  books
    .filter(b => b.author_id === id)
    .forEach(book => {
      sales
        .filter(s => s.book_id === book.id)
        .forEach(sale => {
          result.push({
            book_title: book.title,
            quantity: sale.quantity,
            royalty_earned: sale.quantity * book.royalty,
            sale_date: sale.date
          });
        });
    });

  result.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
  res.json(result);
});

module.exports = router;
