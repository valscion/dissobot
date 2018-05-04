// @flow

import "babel-polyfill";

import serverless from "serverless-http";
import bodyParser from "body-parser";
import express from "express";
import AWS from "aws-sdk";

import { USERS_TABLE, IS_OFFLINE, TELEGRAM_URL_SECRET } from "./environment";
import * as telegram from "./telegram";

const app = express();

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
