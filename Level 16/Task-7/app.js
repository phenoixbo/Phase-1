const express = require('express');
const app = express();
const PORT = 3004;

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); 
};

app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Us Page');
});

app.get('/contact', (req, res) => {
    res.send('Contact Us Page');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
