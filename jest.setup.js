process.env = {
  ...process.env,
  TELEGRAM_BOT_NAME: "TELEGRAM_BOT_NAME",
  TELEGRAM_TOKEN: "TELEGRAM_TOKEN",
  TELEGRAM_URL_SECRET: "TELEGRAM_URL_SECRET",
  ILMOS_TABLE: "ILMOS_TABLE",
  USERS_TABLE: "USERS_TABLE",
  IS_OFFLINE: "true"
};

// Force all AJAX requests to be mocked
jest.mock("node-fetch", () => {
  return (...args) => {
    console.error("Unexpected AJAX request!", args);
    throw new Error("Unexpected AJAX request!");
  };
});

// Enable database mocking
jest.mock("./src/common/db");
// Enable Telegram API mocking
jest.mock("./src/telegram/api");
