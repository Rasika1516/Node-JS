const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('../models/Article');

const scrapeWebsite = async (url) => {
    try {
        const { data } = await axios.get(url, { timeout: 10000 });
        const $ = cheerio.load(data);

        // const articles =[];
        // $('.article-class').each((_,element)=>{
        //     const title = $(element).find('.title-class').text().trim();
        //     const author = $(element).find('.author-class').text().trim();
        //     const publicationDate = $(element).find('.date-class').text().trim();

        //     if(title){
        //         articles.push({title,author,publicationDate});
        //     }
        const articles = [];
        $('.post-block').each((_, element) => {
            const title = $(element).find('.post-block__title a').text().trim();
            const author = $(element).find('.river-byline__authors a').text().trim();
            const publicationDate = $(element).find('.river-byline__time').attr('datetime') || '';

            if (title) {
                articles.push({ title, author, publicationDate });
            }
        });

        await Article.insertMany(articles);
        return articles;
    } catch (error) {
        console.error('Error during web scraping:', error.message);
        throw new Error('Failed to scrape data');
    }
};

module.exports = { scrapeWebsite };