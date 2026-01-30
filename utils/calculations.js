const { books, sales, withdrawals } = require("../data/seedData");

function calculateTotalEarnings(authorId) {
  let total = 0;

  books
    .filter(b => b.author_id === authorId)
    .forEach(book => {
      sales
        .filter(s => s.book_id === book.id)
        .forEach(sale => {
          total += sale.quantity * book.royalty;
        });
    });

  return total;
}

function calculateCurrentBalance(authorId) {
  const totalEarnings = calculateTotalEarnings(authorId);

  const withdrawn = withdrawals
    .filter(w => w.author_id === authorId)
    .reduce((sum, w) => sum + w.amount, 0);

  return totalEarnings - withdrawn;
}

module.exports = {
  calculateTotalEarnings,
  calculateCurrentBalance
};
