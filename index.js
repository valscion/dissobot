const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const AWS = require("aws-sdk");

const telegram = require("./telegram");

const USERS_TABLE = process.env.USERS_TABLE;

const IS_OFFLINE = process.env.IS_OFFLINE;
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

const TELEGRAM_URL = "/telegram/" + process.env.TELEGRAM_URL_SECRET;
app.post(TELEGRAM_URL, function(req, res) {
  console.log("Telegram URL called");
  console.log(JSON.stringify(req.body));

  const { message } = req.body;
  if (message) {
    const { chat } = message;
    if (chat && chat.id && chat.type == "private") {
      telegram
        .sendMessage({
          chat_id: chat.id,
          text: message.text
        })
        .then(() => res.send("OK"), err => res.status(500).json(err));
    }
  } else {
    res.status(404).json({ error: "No message received" });
  }
});

module.exports.handler = serverless(app);
