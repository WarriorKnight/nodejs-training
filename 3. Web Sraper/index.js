import axios from 'axios'
import * as cheerio from 'cheerio'

(async () => {
    try {
        // Fetch the website
        const res = await axios('https://webscraper.io/test-sites/e-commerce/allinone');
        const htmlData = res.data;
        const $ = cheerio.load(htmlData);
        let totalPrice = 0;
        let productCount = 0;

        // Scrape the prices and calculate some statistics
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
    } catch (error) {
        // Handle errors
        console.error("An error occurred:", error.message);
    }
})();