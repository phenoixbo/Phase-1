const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3008;

const upload = multer({
    dest: 'uploads/', 
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'), false); 
    }
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.send(`
            <h1>File Uploaded Successfully</h1>
            <p>File Name: ${req.file.originalname}</p>
            <p>File Size: ${req.file.size} bytes</p>
            <img src="/uploads/${req.file.filename}" alt="${req.file.originalname}" width="200" />
        `);
    } catch (error) {
        res.status(400).send(error.message); 
    }
});
app.use('/uploads', express.static('uploads'));
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).send(`Multer error: ${err.message}`);
    } else {
        res.status(400).send(`Error: ${err.message}`);
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
