require("dotenv").config();
const express = require("express");
const ipHelper = require("./ipHelper.js");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, "visits.json");
let visits = [];

// const ipData = JSON.parse(`{
//   "About Us": "https://ipwhois.io",
//   "ip": "81.90.168.61",
//   "success": true,
//   "type": "IPv4",
//   "continent": "Europe",
//   "continent_code": "EU",
//   "country": "Czech Republic",
//   "country_code": "CZ",
//   "region": "Southwest",
//   "region_code": "",
//   "city": "Ceske Budejovice",
//   "latitude": 48.9756578,
//   "longitude": 14.480255,
//   "is_eu": true,
//   "postal": "370 49",
//   "calling_code": "420",
//   "capital": "Prague",
//   "borders": "AT,DE,PL,SK",
//   "flag": {
//       "img": "https://cdn.ipwhois.io/flags/cz.svg",
//       "emoji": "\\ud83c\\udde8\\ud83c\\uddff",
//       "emoji_unicode": "U+1F1E8 U+1F1FF"
//   },
//   "connection": {
//       "asn": 5610,
//       "org": "Elsat Spol. S R.O.",
//       "isp": "O Czech Republic, A.S.",
//       "domain": "elsatnet.cz"
//   },
//   "timezone": {
//       "id": "Europe/Prague",
//       "abbr": "CET",
//       "is_dst": false,
//       "offset": 3600,
//       "utc": "+01:00",
//       "current_time": "2025-03-28T18:12:26+01:00"
//   }
// }`);

if (fs.existsSync(dataFilePath)) {
    try {
        const fileData = fs.readFileSync(dataFilePath, { encoding: "utf8" });
        visits = JSON.parse(fileData);
    } catch (err) {
        console.error("Error reading visits file:", err);
    }
}

function saveVisits() {
    fs.writeFileSync(dataFilePath, JSON.stringify(visits, null, 2));
}

const router = express.Router();

router.get("/visit", async function (req, res) {
    const ipData = await ipHelper.getGeoLocation(ip);
    console.log("saving visitor data");
    const ip = '81.90.168.61';
    
    const visit = {
        lat: ipData.latitude,
        lng: ipData.longitude,
        visitTime: new Date().toISOString()
    };
    visits.push(visit);
    saveVisits();

    console.log("Visits:", visits);
    res.json(ipData);
});

router.get("/visits", async function (req, res) {
  console.log("Sending visits data");

  console.log("saving visitor data");
  const ip = req.ip;//'81.90.168.61';
  const ipData = await ipHelper.getGeoLocation(ip);
  
  const visit = {
      lat: ipData.latitude,
      lng: ipData.longitude,
      visitTime: new Date().toISOString()
  };
  visits.push(visit);
  saveVisits();


  res.json(visits);
});

app.use("/api", router);

const staticPath = path.join(__dirname, "./dist/");
app.use(express.static(staticPath));


app.get("/",  async function (req, res) {
  console.log("Sending local file");
  res.sendFile(path.join(staticPath, "index.html"));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});