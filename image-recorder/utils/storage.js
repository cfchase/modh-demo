const env = require("env-var");
const fs = require("fs");
const S3Storage = require("./s3Storage");

const {
  S3_ENDPOINT,
  S3_BUCKET,
  S3_PREFIX,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
} = require("./constants");

let storage;
if (S3_ENDPOINT && S3_BUCKET && S3_PREFIX && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY) {
  storage = new S3Storage(
    S3_ENDPOINT,
    S3_BUCKET,
    S3_PREFIX,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY
  );
} else {
  storage = {
    writeFile: async (file, data) => fs.promises.writeFile(data, file),
  };
}

module.exports = storage;
