const {KAFKA_BROKER_LIST, KAFKA_TOPIC_OBJECTS} = require("../utils/constants");


const config = {
  //'debug': 'all',
  'metadata.broker.list': KAFKA_BROKER_LIST,
  'group.id': 'image-player-consumer',
  'enable.auto.commit': false
}

const setup = (fastify) => {
  fastify.kafka.consumer.on('error', err => {
    if (err) {
      fastify.log.error(err);
    }
  })

  fastify.kafka.subscribe(KAFKA_TOPIC_OBJECTS);
  fastify.kafka.on(KAFKA_TOPIC_OBJECTS, async (message, commit) => {

    // Output the actual message contents
    fastify.log.info(JSON.stringify(message));
    fastify.log.info(message.value.toString());
    commit();
  });

  fastify.kafka.consume();
}

module.exports.config = config;
module.exports.setup = setup;