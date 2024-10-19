require('dotenv').config();

module.exports = {
  waPhoneNumberId: process.env.WA_PHONE_NUMBER_ID,
  cloudApiAccessToken: process.env.CLOUD_API_ACCESS_TOKEN,
  cloudApiVersion: process.env.CLOUD_API_VERSION,
};
