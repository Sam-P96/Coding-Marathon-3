const express = require('express');
const cors = require('cors');
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const userRouter = require('./routes/userRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json'); // Assuming swagger.json is in the same directory

const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

connectDB();

// Routes
app.use('/api/vehicles', vehicleRentalRouter);
app.use('/api/users', userRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(express.static('view'));

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});
module.exports = app;
