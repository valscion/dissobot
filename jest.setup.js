process.env = {
  ...process.env,
  TELEGRAM_BOT_NAME: "TELEGRAM_BOT_NAME",
  TELEGRAM_TOKEN: "TELEGRAM_TOKEN",
  TELEGRAM_URL_SECRET: "TELEGRAM_URL_SECRET",
  ILMOS_TABLE: "ILMOS_TABLE",
  USERS_TABLE: "USERS_TABLE",
  IS_OFFLINE: "true"
};

// Enable database mocking
jest.mock("./src/common/db");
