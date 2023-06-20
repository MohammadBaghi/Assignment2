const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://<username>:<password>@<host>:<port>/DressStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());

// Create a new product
app.post('/products', (req, res) => {
  const { name, description, price, published, category } = req.body;
  const product = new Product({ name, description, price, published, category });

  product.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error creating the product' });
    });
});

// Get all products
app.get('/products', (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving products' });
    });
});

// Other CRUD endpoints for updating and deleting products

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

