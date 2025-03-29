const express = require('express');
const app = express();
const PORT = 3005;
app.use(express.json());
let products = [
    { id: 1, name: "Laptop", price: 1000, description: "A high-performance laptop" },
    { id: 2, name: "Smartphone", price: 500, description: "A powerful smartphone" },
    { id: 3, name: "Headphones", price: 100, description: "Noise-canceling headphones" }
];
app.get('/products', (req, res) => {
    res.json(products);
});
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});
app.post('/products', (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        description
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, description } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    res.json(product);
});
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).json({ message: "Product not found" });

    products.splice(productIndex, 1);
    res.status(204).send();  
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
