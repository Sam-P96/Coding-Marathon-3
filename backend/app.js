
const express = require('express');
const cors = require('cors');
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const userRouter = require("./routes/userRouter");

// Here for testing, remove when not testing
require('dotenv').config();
const connectDB = require("./config/db")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Here for testing, remove when not testing
connectDB();

// Routes
app.use('/api/vehicles', vehicleRentalRouter);
app.use("/api/users", userRouter);
app.use(express.static('view'));




// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

app.use((req, res) => {
    res.sendFile(__dirname + "/view/index.html");
}
) 
module.exports = app;

