const express = require('express');
const Article = require('../models/Article');
const { scrapeWebsite } = require('../services/scraper');

const router = express.Router();

router.post('/scrape', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    try {
        const scrapedData = await scrapeWebsite(url);
        res.status(200).json({ message: 'Data scraped successfully', data: scrapedData });
    } catch (error) {
        res.status(500).json({ message: 'Failed to scrape data', error: error.message });
    }
});
router.get('/scraped-data', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(5000).json({ message: 'failed to fetch data', error: error.message });
    }
});

module.exports = router;