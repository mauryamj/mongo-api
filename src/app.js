require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express(); //creates the server object

// Middleware
app.use(express.json());

// Database connection
connectDB();

const errorHandler = require('./middleware/errorMiddleware');

// Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
