const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/get-expenses', expenseController.getExpenses);

router.post('/add-expense', expenseController.addExpense);

router.delete('/delete-expense/:id', expenseController.removeExpense);

module.exports = router;