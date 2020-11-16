const env = require("env-var");
const PORT = env.get("PORT").default("8080").asIntPositive();
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
const LOG_LEVEL = env.get("LOG_LEVEL").default("info").asString()
const OBJECT_DETECTION_URL = env.get("OBJECT_DETECTION_URL").default("http://object-detection:8080/logos").asString();
const KAFKA_BROKER_LIST = env.get("KAFKA_BROKER_LIST").asString();
const KAFKA_TOPIC_OBJECTS = env.get("KAFKA_TOPIC_OBJECTS").asString();

module.exports = {
  PORT,
  IP,
  LOG_LEVEL,
  OBJECT_DETECTION_URL,
  KAFKA_BROKER_LIST,
  KAFKA_TOPIC_OBJECTS
};
