require("dotenv").config();
const express = require("express");
const ipHelper = require("./ipHelper.js");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, "visits.json");
let visits = [];

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

router.get("/visits", async function (req, res) {
  const ip = req.ip;
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