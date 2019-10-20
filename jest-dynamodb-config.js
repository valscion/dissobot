module.exports = () => {
  // NOTE: Keep table definitions in sync with the ones in serverless.yml
  const tables = [
    {
      TableName: `ILMOS_TABLE`,
      KeySchema: [{ AttributeName: "date", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "date", AttributeType: "S" }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
    },
    {
      TableName: `USERS_TABLE`,
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
    }
  ];

  return {
    tables,
    port: 8000
  };
};
