const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const Contact = require('./contactModel');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));
app.use('/api/contacts', contactRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  app.post('/contacts', async (req, res) => {
    try {
      const { name, email, phone, address } = req.body;
      if (!name || !email || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      const contact = new Contact({
        name,
        email,
        phone,
        address
      });
      await contact.save();
  
      res.status(201).json(contact); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
