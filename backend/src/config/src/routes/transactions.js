const express = require('express');
const pool    = require('../config/db');
const auth    = require('../middleware/auth');
const router  = express.Router();

router.use(auth);

// GET /api/transactions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC, created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/transactions/summary
router.get('/summary', async (req, res) => {
  try {
    const monthly = await pool.query(
      `SELECT TO_CHAR(date, 'Mon YYYY') AS month,
              DATE_TRUNC('month', date) AS month_start,
              SUM(CASE WHEN type='income'  THEN amount ELSE 0 END) AS total_income,
              SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expenses
       FROM transactions WHERE user_id=$1
       GROUP BY month, month_start ORDER BY month_start DESC LIMIT 6`,
      [req.user.id]
    );
    const categories = await pool.query(
      `SELECT category, SUM(amount) AS total FROM transactions
       WHERE user_id=$1 AND type='expense' GROUP BY category ORDER BY total DESC`,
      [req.user.id]
    );
    res.json({ monthly: monthly.rows, categories: categories.rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/transactions
router.post('/', async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  if (!type || !amount || !category || !date)
    return res.status(400).json({ message: 'type, amount, category, date are required.' });
  try {
    const result = await pool.query(
      'INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [req.user.id, type, amount, category, description || '', date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/transactions/:id
router.put('/:id', async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  const { id } = req.params;
  try {
    const check = await pool.query(
      'SELECT id FROM transactions WHERE id=$1 AND user_id=$2',
      [id, req.user.id]
    );
    if (check.rows.length === 0)
      return res.status(404).json({ message: 'Transaction not found.' });

    const result = await pool.query(
      'UPDATE transactions SET type=$1,amount=$2,category=$3,description=$4,date=$5 WHERE id=$6 AND user_id=$7 RETURNING *',
      [type, amount, category, description, date, id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM transactions WHERE id=$1 AND user_id=$2 RETURNING id',
      [req.params.id, req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Transaction not found.' });
    res.json({ message: 'Deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;