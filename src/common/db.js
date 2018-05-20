// @flow

import AWS from "aws-sdk";

import { IS_OFFLINE } from "./environment";

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

type PutParams = {
  TableName: string,
  Item: Object
};

export function put(params: PutParams): Promise<void> {
  return new Promise((resolve, reject) => {
    dynamoDb.put(params, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

type ScanParams = {
  TableName: string
};

export function scan(params: ScanParams): Promise<any> {
  return new Promise((resolve, reject) => {
    dynamoDb.scan(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
