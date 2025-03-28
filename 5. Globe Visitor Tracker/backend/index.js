require("dotenv").config();
const express = require("express");
const ipHelper = require("./ipHelper.js");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
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
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(visits, null, 2));
    } catch (err) {
        console.error("Error saving visits file:", err);
    }
}

const router = express.Router();

router.get("/visits", async (req, res) => {
    try {
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
    } catch (error) {
        console.error("Error processing visit:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use("/api", router);

const staticPath = path.join(__dirname, "dist");
app.use(express.static(staticPath));

app.get("*", (req, res) => {
    console.log("Serving index.html");
    res.sendFile(path.join(staticPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});