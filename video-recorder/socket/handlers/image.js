const {KAFKA_TOPIC_IMAGES} = require('../../constants');
const {OUTGOING_MESSAGE_TYPES} = require('../message-types');

async function imageHandler(fastify, conn, messageObj) {
  fastify.log.info('imageHandler', abbreviatedObject(messageObj));
  // sendKafkaMsg(fastify, KAFKA_TOPIC_IMAGES, messageObj.userId, formatKafkaMsg(messageObj));
  conn.socket.send(JSON.stringify({
    type: OUTGOING_MESSAGE_TYPES.OBJECT_DETECTION,
    incomingObject: {...messageObj},
    objectDetection: {},
  }));
}

function formatKafkaMsg({userId, image}) {
  return JSON.stringify({userId, image});
}

function sendKafkaMsg(fastify, topic, key, payload) {
  const shrunk = abbreviatedObject(JSON.parse(payload));
  fastify.log.debug(
    `kafka produce topic: ${topic}; key: ${key}; payload: ${JSON.stringify(
      shrunk)}`);
  try {
    // let kafkaMsg = Buffer.from(jsonMsg);
    // let result = fastify.kafka.producer.produce(KAFKA_TOPIC, -1, kafkaMsg, null);
    let result = fastify.kafka.push({topic, payload, key});
    fastify.log.debug('Pushed message', result, shrunk);
  } catch (error) {
    fastify.log.error('kafka producer failed to send message. Error: ',
      error.message);
  }
}

function abbreviatedObject(obj) {
  let abbr = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      abbr[key] = abbreviatedObject(value);
    } else if (typeof value === 'string' && value.length > 20) {
      abbr[key] = value.substring(0, 20);
    } else {
      abbr[key] = value;
    }
  }
  return obj;
}

module.exports = imageHandler;
