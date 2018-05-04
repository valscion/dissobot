// @flow

const env = process.env;

if (!env.TELEGRAM_TOKEN) throw new Error("TELEGRAM_TOKEN env var is missing");
if (!env.TELEGRAM_URL_SECRET)
  throw new Error("TELEGRAM_URL_SECRET env var is missing");
if (!env.USERS_TABLE) throw new Error("USERS_TABLE env var is missing");

module.exports = {
  TELEGRAM_TOKEN: env.TELEGRAM_TOKEN,
  TELEGRAM_URL_SECRET: env.TELEGRAM_URL_SECRET,
  USERS_TABLE: env.USERS_TABLE,
  IS_OFFLINE: env.IS_OFFLINE
};
