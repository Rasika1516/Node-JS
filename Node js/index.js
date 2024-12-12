require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db/connection');
const scrapedDataRoutes = require('./src/routes/scrapedData');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api',scrapedDataRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});