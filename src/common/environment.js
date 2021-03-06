// @flow

const env = process.env;

if (!env.TELEGRAM_BOT_NAME)
  throw new Error("TELEGRAM_BOT_NAME env var is missing");
if (!env.TELEGRAM_TOKEN) throw new Error("TELEGRAM_TOKEN env var is missing");
if (!env.TELEGRAM_URL_SECRET)
  throw new Error("TELEGRAM_URL_SECRET env var is missing");
if (!env.ILMOS_TABLE) throw new Error("ILMOS_TABLE env var is missing");
if (!env.USERS_TABLE) throw new Error("USERS_TABLE env var is missing");

module.exports = {
  TELEGRAM_BOT_NAME: env.TELEGRAM_BOT_NAME,
  TELEGRAM_TOKEN: env.TELEGRAM_TOKEN,
  TELEGRAM_URL_SECRET: env.TELEGRAM_URL_SECRET,
  ILMOS_TABLE: env.ILMOS_TABLE,
  USERS_TABLE: env.USERS_TABLE,
  IS_OFFLINE: env.IS_OFFLINE,
  ILMO_SPREADSHEET_URL: env.ILMO_SPREADSHEET_URL,
  ILMO_SPREADSHEET_API_URL: env.ILMO_SPREADSHEET_API_URL
};
