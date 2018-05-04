// @flow

require("babel-polyfill");

const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const AWS = require("aws-sdk");

const {
  USERS_TABLE,
  IS_OFFLINE,
  TELEGRAM_URL_SECRET
} = require("./environment");
const telegram = require("./telegram");

let dynamoDb;
if (IS_OFFLINE === "true") {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "indifferent",
    secretAccessKey: "lul im a sekrit"
  });
  // console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

app.use(bodyParser.json({ strict: false }));

const TELEGRAM_URL = "/telegram/" + TELEGRAM_URL_SECRET;
app.post(TELEGRAM_URL, async function(req, res) {
  console.log("Telegram URL called");
  console.log(JSON.stringify(req.body));

  const { message } = req.body;
  if (message) {
    const { chat } = message;
    if (chat && chat.id && chat.type == "private") {
      try {
        await telegram.sendMessage({
          chat_id: chat.id,
          text: message.text
        });
        res.send("OK");
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } else {
    res.status(404).json({ error: "No message received" });
  }
});

module.exports.handler = serverless(app);
