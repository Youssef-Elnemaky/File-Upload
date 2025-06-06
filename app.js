const path = require('path');

require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// database
const connectDB = require('./db/connect');

// router
const productRouter = require('./routes/productRoutes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middlewares
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/api/v1', (req, res) => {
    res.send('<h1>File Upload Starter</h1>');
});

// routes
app.use('/api/v1/products', productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI)
    .then(console.log('Connected to DB...'))
    .catch((err) => console.log(err));

const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URI);

        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();

module.exports = app;
