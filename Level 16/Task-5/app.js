const express = require('express');
const app = express();
const PORT = 3002;
app.get('/search', (req, res) => {
    const query = req.query.q || 'Not specified';
    const limit = req.query.limit || 5; 

    res.send(`Search for: ${query}, Limit: ${limit}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
