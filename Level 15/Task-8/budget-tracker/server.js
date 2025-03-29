require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/budget-tracker')
    .then(() => {
        console.log(" Connected to MongoDB");
        app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
    })
    .catch(err => console.log(" Error connecting to MongoDB:", err));
const transactionRoutes = require('./routes/Transactions');
app.use('/api/transactions', transactionRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
