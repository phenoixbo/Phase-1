const express = require('express');
const app = express();
const PORT = 3000;
const users = [
    { id: 1, name: 'Pradeep', email: 'pradeep@example.com' },
    { id: 2, name: 'Rooban', email: 'rooban@example.com' },
    { id: 3, name: 'Ganesan', email: 'ganesan@example.com' }
];
app.get('/api/users', (req, res) => {
    res.json(users);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
