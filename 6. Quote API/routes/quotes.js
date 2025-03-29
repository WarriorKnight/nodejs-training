const express = require('express');
const Quote = require('../models/Quote');

const router = express.Router();

// GET a random quote
router.get('/random', async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(randomIndex);
    res.json(randomQuote);
  } catch (error) {
    console.error('Error fetching random quote:', error);
    res.status(500).json({ error: 'Error fetching random quote' });
  }
});

//Search for categories
router.get('/category/:category', async (req, res) => {
    try {
        const quotes = await Quote.find({ categories: req.params.category });
        if (quotes.length === 0) {
            return res.status(404).json({ error: 'No quotes found for this category' });
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        res.json(quotes[randomIndex]);
    } catch (error) {
        console.error('Error fetching quotes by category:', error);
        res.status(500).json({ error: 'Error fetching quotes by category' });
    }
});

//Fallback route for undefined endpoints
router.use((req, res) => {
    res.status(404).json({ error: 'Route not found.' });
});

module.exports = router;