const ExpenseData = require('../models/expense');

exports.getExpenses = (req, res, next) => {
    ExpenseData.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.addExpense = (req, res, next) => {
    console.log(req.body);
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    ExpenseData.create({
        amount, description, category
    })
        .then(result => {
            console.log("Expense Added!");
            res.json(result.dataValues);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.removeExpense = (req, res, next) => {
    const id = req.params.id;
    ExpenseData.findByPk(id)
        .then(expense => {
            return expense.destroy();
        })
        .then(result => {
            console.log("Expense Deleted!");
            res.sendStatus(204).end();
        })
        .catch(err => {
            console.log(err);
        });
};