const express = require('express');
const app = express();
const PORT = 3007;
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.get('/error', (req, res, next) => {
    const err = new Error('Something went wrong!');
    err.status = 500;
    next(err);
});
app.get('/nonexistent', (req, res, next) => {
    next();
});
app.get('/throw-error', (req, res, next) => {
    throw new Error('This is a manually thrown error');
});
app.get('/api/data', (req, res, next) => {
    const err = new Error('Data not found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    if (req.url.startsWith('/api')) {
        return res.status(err.status || 500).json({
            message: err.message,
            status: err.status || 500,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    } else {
        res.status(err.status || 500);
        res.send(`
            <h1>Error: ${err.message}</h1>
            <p>Status: ${err.status || 500}</p>
            <p>${process.env.NODE_ENV === 'development' ? err.stack : ''}</p>
        `);
    }
});
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
