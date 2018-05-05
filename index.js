// @flow

import "babel-polyfill";
import AWS from "aws-sdk";

import { IS_OFFLINE } from "./environment";
import handler from "./handler";

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

module.exports.handler = handler;
