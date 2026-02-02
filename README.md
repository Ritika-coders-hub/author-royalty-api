📚 Author Royalty API

A Node.js + Express REST API to manage authors, books, sales, royalties, and withdrawals.
The API calculates total earnings and current balances based on book sales and enforces business rules for withdrawals.

🚀 Tech Stack

Node.js

Express.js

CORS (for cross-origin requests)

In-memory data (seed data)

Why this stack?
Node.js + Express provides a lightweight, fast backend that is easy to maintain and ideal for REST APIs.
🧪 Testing

Tested locally using VS Code REST Client (api-test.http)

All endpoints return correct data

All validation rules enforced

Proper HTTP status codes used

☁️ Deployment

The API is deployed on Render (Free Tier).
⏱ Time Spent

Approximately 8–10 hours, including:

API design

Business logic

Debugging

Testing

Deployment

✅ Assumptions

Data is stored in memory (no database) as per assignment scope

Withdrawals are stored temporarily and reset on server restart

Focus was on correctness and clarity over complexity
