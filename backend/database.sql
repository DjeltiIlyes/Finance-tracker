-- Run this file in your PostgreSQL database to set up the schema
-- Command: psql -U postgres -d finance_tracker -f database.sql

-- Create database (run this separately first if needed):
-- CREATE DATABASE finance_tracker;

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type        VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
  amount      DECIMAL(12, 2) NOT NULL,
  category    VARCHAR(50) NOT NULL,
  description TEXT DEFAULT '',
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date    ON transactions(date);

-- Sample data (optional - delete if not needed)
-- INSERT INTO users (name, email, password) VALUES ('Demo User', 'demo@demo.com', '$2a$10$hash');
