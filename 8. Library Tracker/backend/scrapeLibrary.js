const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const LIBRARY_URL = "https://www.techlib.cz/cs/";

//Function that fetches the number of people inside the library
async function scrapeLibraryOccupancy() {
  try {
    const { data: html } = await axios.get(LIBRARY_URL);

    // Save the raw HTML to a file for debugging
    // const filePath = path.join(__dirname, "library-page.html");
    // fs.writeFileSync(filePath, html);
    // console.log(`📄 Saved HTML to ${filePath}`);

    // Load HTML with cheerio
    const $ = cheerio.load(html);

    // Select the <div> and find the <span> inside it
    const spanText = $('div.panel-body.text-center.lead span').first().text().trim();
    const occupancy = parseInt(spanText, 10);

    if (isNaN(occupancy)) {
      console.error("Could not parse occupancy count.");
    } else {
      console.log(`Current NTK occupancy: ${occupancy} people`);
    }
  } catch (err) {
    console.error("Failed to fetch NTK data:", err.message);
  }
}

scrapeLibraryOccupancy();
