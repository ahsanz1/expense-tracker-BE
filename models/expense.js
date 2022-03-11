const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    expenseCategory: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Expense', expenseSchema)