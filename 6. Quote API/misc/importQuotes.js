//import quotes from JSON file to db

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Quote = require('../models/Quote');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const data = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));

    return Quote.insertMany(data);
  })
  .then(() => {
    console.log('📥 Quotes imported successfully!');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Import failed:', err);
    mongoose.disconnect();
  });
