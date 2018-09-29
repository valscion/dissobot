// @flow

export type APIGatewayEvent = {
  body: string | null,
  headers: { [name: string]: string },
  httpMethod: string,
  isBase64Encoded: boolean,
  path: string,
  pathParameters: { [name: string]: string } | null,
  queryStringParameters: { [name: string]: string } | null,
  stageVariables: { [name: string]: string } | null,
  requestContext: {
    accountId: string,
    apiId: string,
    httpMethod: string,
    identity: {
      accessKey: string | null,
      accountId: string | null,
      apiKey: string | null,
      caller: string | null,
      cognitoAuthenticationProvider: string | null,
      cognitoAuthenticationType: string | null,
      cognitoIdentityId: string | null,
      cognitoIdentityPoolId: string | null,
      sourceIp: string,
      user: string | null,
      userAgent: string | null,
      userArn: string | null
    },
    stage: string,
    requestId: string,
    resourceId: string,
    resourcePath: string
  },
  resource: string
};

export type ProxyResult = {
  statusCode: number,
  headers?: {
    [header: string]: boolean | number | string
  },
  body: string,
  isBase64Encoded?: boolean
};

export type SingleIlmoObject = {|
  date: string,
  dateAsWritten: string,
  songs: string | null,
  attendingList: Array<string>,
  notAttendingList: Array<string>,
  unknownList: Array<string>
|};

export type IlmoObject = {
  [date: string]: SingleIlmoObject
};
