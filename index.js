const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const AWS = require("aws-sdk");

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

app.get("/", function(req, res) {
  console.log("Hello from root");
  res.send("Hello World!");
});

const TELEGRAM_URL = "/telegram/" + process.env.TELEGRAM_URL_SECRET;
const TELEGRAM_API_ROOT =
  "https://api.telegram.org/bot" + process.env.TELEGRAM_TOKEN;
app.post(TELEGRAM_URL, function(req, res) {
  console.log("Telegram URL called");
  console.log(JSON.stringify(req.body));

  const { message } = req.body;
  if (message) {
    const { chat } = message;
    if (chat && chat.id && chat.type == "private") {
      console.log("Replying back to private message");
      fetch(TELEGRAM_API_ROOT + "/sendMessage", {
        headers: {
          "user-agent": "DissoBot v0.0.0",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chat.id,
          text: message.text
        })
      })
        .then(res => res.json())
        .then(json =>
          console.log("Response back from Telegram: " + JSON.stringify(json))
        );
    }
  }
  res.send("OK");
});

// Get User endpoint
app.get("/users/:userId", function(req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get user" });
    }
    if (result.Item) {
      const { userId, name, foo } = result.Item;
      res.json({ userId, name, foo });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// Create User endpoint
app.post("/users", function(req, res) {
  const { userId, name, foo } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
      foo: foo
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create user" });
    }
    res.json({ userId, name, foo });
  });
});

module.exports.handler = serverless(app);
