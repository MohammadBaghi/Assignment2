const Product = require('../models/Product');

// Get all products
exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving products' });
    });
};

// Get product by id
exports.getProductById = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving product' });
    });
};

// Add new product
exports.addProduct = (req, res) => {
  const { name, description, price, published, category } = req.body;
  const product = new Product({ name, description, price, published, category });

  product.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error creating the product' });
    });
};

// Update product by id
exports.updateProductById = (req, res) => {
  const { id } = req.params;
  const { name, description, price, published, category } = req.body;
  Product.findByIdAndUpdate(
    id,
    { name, description, price, published, category },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating product' });
    });
};

// Remove product by id
exports.removeProductById = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error
