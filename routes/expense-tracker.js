const express = require("express")
const router = express.Router()
const Category = require("../models/category")
const Expense = require("../models/expense")

const getCategory = async (req, res, next) => {
    let category
    try {
        category = await Category.findById(req.params.id)
        if (category == null) {
            return res.status(404).json({ message: 'Category not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.category = category
    next()
}

const getExpense = async (req, res, next) => {
    let expense
    try {
        expense = await Expense.findById(req.params.id)
        if (expense == null) {
            return res.status(404).json({ message: 'Expense not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.expense = expense
    console.log("Expense found", expense)
    next()
}


router.get('/', (req, res) => {
    res.send('Please request appropriate endpoint!')
})

/**
 * Category Endpoints
 */

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/categories', async (req, res) => {
    const category = new Category({
        name: req.body.name
    })

    try {
        const newCategory = await category.save()
        res.json(newCategory)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.delete('/categories', async (req, res) => {
    try {
        const deleteAllRes = await Category.deleteMany()
        res.json(deleteAllRes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/categories/:id', getCategory, async (req, res) => {
    if (res.category) {
        res.json(res.category)
    } else res.status(404).json({ message: 'Could not find category' })
})

router.patch('/categories/:id', getCategory, async (req, res) => {
    if (req.body.name != null) {
        res.category.name = req.body.name
    }
    try {
        const updatedCategory = await res.category.save()
        res.json(updatedCategory)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/categories/:id', getCategory, async (req, res) => {
    try {
        await res.category.remove()
        res.json({ message: 'Category Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/**
 * Expense Object Structure = {
 *      date,
 *      amount,
 *      expenseCategory,
 *      description
 * }
 */

/**
 * Expense Endpoints
 */

router.get('/expenses', async (req, res) => {
    try {
        const allExpenses = await Expense.find()
        res.json(allExpenses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/expenses/:id', getExpense, (req, res) => {
    if (res.expense) {
        res.json(res.expense)
    } else res.status(404).json({ message: 'Could not find expense' })
})

router.post('/expenses', async (req, res) => {
    const expense = new Expense({
        expenseCategory: req.body.expenseCategory,
        date: req.body.date,
        amount: req.body.amount,
        description: req.body.description
    })

    try {
        const newExpense = await expense.save()
        res.json(newExpense)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.patch('/expenses/:id', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "No request body" })
        return
    }
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedExpense)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/expenses/:id', getExpense, async (req, res) => {
    try {
        await res.expense.remove()
        res.json({ message: 'Expense Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/expenses', async (req, res) => {
    try {
        const deleteAllExpensesRes = await Expense.deleteMany()
        res.json(deleteAllExpensesRes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router