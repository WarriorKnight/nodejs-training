const express = require("express");
const { readFile } = require("fs").promises;

const app = express();

app.get("/", async (request, response) => {
  response.send(await readFile("./home.tml", "utf8"));
});

app.listen(3000, () => {
  console.log("Avaible on port 3000!");
});
