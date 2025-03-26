import axios from 'axios'
import * as cheerio from 'cheerio'
import express from 'express'


const PORT = 3000;
const app = express();


axios('https://webscraper.io/test-sites/e-commerce/allinone')
.then(res => {
    const htmlData = res.data;
    const $ = cheerio.load(htmlData);
    let totalPrice = 0;
    let productCount = 0;

    $('.price', htmlData).each((index, element) => {
        const priceText = $(element).text();
        const price = parseFloat(priceText.match(/\d+/g).join(''));
        totalPrice += price;
        productCount += 1;
    });

    const averagePrice = productCount > 0 ? (totalPrice / productCount).toFixed(2) : 0;
    console.log("Total price is:", totalPrice);
    console.log("Total products:", productCount);
    console.log("Average price is:", averagePrice);
});

app.listen(PORT, () => console.log("Server is listening on 3000"));