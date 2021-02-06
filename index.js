const fs = require("fs");
const path = require("path");
const moment = require("moment");
const express = require('express');

const config = require("./config.json");
const LinguaToolsApi = require("./LinguaToolsApi");

const app = express();
const PORT_NUMBER = config.PORT;
const http = require('http').Server(app);

// Configure Express

const linguaTools = new LinguaToolsApi();

// Middleware to log requests
app.use("/", async (req, res, next) => {
  console.log(moment().format("MM/DD/YYYY HH:mm:ss"), "REQUEST", req.originalUrl);
  next();
});


// Configure Routing
app.get('/', (req, res) => {
  return res.send("Lexicala API Microservice is up.");
});

app.get('/translate', async (req, res) => {
  const query = req.query.query;
  const langPair = req.query.langpair
  return res.send(
    await linguaTools.translateWord(query, langPair)
  );
});

// Express-Server Start Up
http.listen(PORT_NUMBER, async () => {
  console.log(`listening on *:${PORT_NUMBER}`);
});