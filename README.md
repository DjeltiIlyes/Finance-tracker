# 💰 Personal Finance Tracker

A full-stack personal finance web application with JWT authentication, transaction management, and interactive charts.

![Finance Tracker](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-18-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue) ![JWT](https://img.shields.io/badge/Auth-JWT-orange)

## ✨ Features

- 🔐 **JWT Authentication** — Register, login, protected routes
- 💸 **Transaction Management** — Add, edit, delete income & expenses  
- 🏷️ **Categories** — Food, Rent, Travel, Salary, Freelance, and more
- 📊 **Bar Chart** — Monthly income vs expenses (last 6 months)
- 🥧 **Pie Chart** — Spending breakdown by category
- 💳 **Balance Cards** — Total income, expenses, and net balance at a glance
- 🔍 **Filter** — View all, only income, or only expenses

## 🛠 Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, Vite, Chart.js, Axios   |
| Backend  | Node.js, Express                  |
| Database | PostgreSQL                        |
| Auth     | JWT, bcryptjs                     |

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+
- PostgreSQL v14+

### 2. Database Setup
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE finance_tracker;
\q

# Run the schema
psql -U postgres -d finance_tracker -f backend/database.sql
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from example and fill in your values)
cp .env.example .env
# Edit .env: set DB_PASSWORD to your PostgreSQL password

# Start the server
npm run dev
# Server runs on http://localhost:5000
```

### 4. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the app
npm run dev
# App opens at http://localhost:5173
```

## 📁 Project Structure

```
finance-tracker/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # PostgreSQL connection
│   │   ├── middleware/auth.js    # JWT middleware
│   │   ├── routes/auth.js        # Register & Login
│   │   └── routes/transactions.js # CRUD + summary
│   ├── database.sql              # Database schema
│   ├── .env.example              # Environment template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.jsx     # Main page with charts
    │   │   ├── Navbar.jsx
    │   │   ├── TransactionForm.jsx
    │   │   └── TransactionList.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   └── services/api.js       # All API calls
    └── package.json
```

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login user |
| GET | /api/transactions | Yes | Get all transactions |
| GET | /api/transactions/summary | Yes | Charts data |
| POST | /api/transactions | Yes | Create transaction |
| PUT | /api/transactions/:id | Yes | Update transaction |
| DELETE | /api/transactions/:id | Yes | Delete transaction |

## 🔒 Environment Variables

Create `backend/.env` from the example:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_tracker
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
```

---
Built with ❤️ — Part of a full-stack portfolio series
