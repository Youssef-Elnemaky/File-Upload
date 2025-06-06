const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ status: 'success', nHits: products.length, products });
};

exports.createProduct = async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product: newProduct });
};
