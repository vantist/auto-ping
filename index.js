'use strict';

const express = require('express');
const request = require('request');
const cron = require('node-cron');

// create LINE SDK config from env variables
const config = {
  pingServer: process.env.PING_TARGET_SERVER
};

const app = express();

app.get('/ping', (req, res) => {
  res.send('done').status(200).end();
});

// listen on port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

cron.schedule('0 10 * * * *', () => {
  console.log(`auto ping to ${config.pingServer}`);
  request.get(config.pingServer, {}, (err, response) => {
    console.log(`auto ping to ${config.pingServer} done`);
  });
});