const {
  KAFKA_BROKER_LIST,
  KAFKA_TOPIC_IMAGES,
  KAFKA_TOPIC_OBJECTS,
} = require("../utils/constants");

const processMessage = require("./process-message");

const init = (fastify) => {
  fastify.log.info("Set up kafka producer %j", {
    KAFKA_BROKER_LIST,
    KAFKA_TOPIC_IMAGES,
    KAFKA_TOPIC_OBJECTS,
  });
  fastify.kafka.producer.on("error", (err) => {
    if (err) {
      fastify.log.error(err);
    }
  });

  fastify.kafka.consumer.on("error", (err) => {
    if (err) {
      fastify.log.error(err);
    }
  });

  fastify.kafka.subscribe(KAFKA_TOPIC_OBJECTS);
  fastify.kafka.on(KAFKA_TOPIC_OBJECTS, async (message, commit) => {
    // Output the actual message contents
    // fastify.log.info(JSON.stringify(message));
    // fastify.log.info(message.value.toString());
    processMessage(fastify, message, commit)
  });

  fastify.kafka.consume();
};

module.exports = init;
