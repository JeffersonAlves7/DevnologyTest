//general config
const config = require("./src/config/config.json");
const scrapper = require("./src/webscrapper");

//express and others configurations
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//principal application
const app = express();

//app configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const response = await scrapper(req.query.marca || "lenovo");
    res.status(200).send({ notebooks: response });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.listen(config.port, () => {
  console.log(`Yous server is available at: http://localhost:${config.port}`)
});
