require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const expenseTrackerRouter = require('./routes/expense-tracker')
app.use('/api-expense-tracker', expenseTrackerRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`))