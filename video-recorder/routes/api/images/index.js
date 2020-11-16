"use strict";

const moment = require("moment");
const _ = require("lodash");
const storage = require("../../../storage");
const axios = require("../../../utils/axios");
const { OBJECT_DETECTION_URL, KAFKA_TOPIC_IMAGES } = require("../../../utils/constants");
const imageStoragePrefix = "images";

module.exports = async function (fastify, opts) {
  fastify.post("/", async function (request, reply) {
    const image = _.get(request, "body.image");
    if (!image) {
      reply.code(422);
      return {
        status: "error",
        message: "Missing Fields: image",
      };
    }

    const base64data = image.replace(/^da36ta:image\/(png|jpg|jpeg);base64,/, "");
    const buff = Buffer.from(base64data, "base64");

    let file;
    try {
      file = await writeJpg(buff, request);
    } catch (error) {
      request.log.error("error occurred writing photo");
      request.log.error(error);
    }

    //
    // sendKafkaMsg(fastify, formatKafkaMsg(request.body, file));

    return requestObjectDetection(base64data);
  });
};

async function writeJpg(data, request) {
  const photoId = generateFilename();
  try {
    const response = await storage.writeFile(data, photoId);
    return photoId;
  } catch (error) {
    request.log.error(`Failure to write ${photoId} to storage`);
    throw error;
  }
}

function generateFilename() {
  const date = moment().format("YYYYMMDD-HH:mm:ss:SSS");
  const random = Math.random().toString(36).slice(-5);
  return `${imageStoragePrefix}/${date}-${random}.jpg`;
}

async function requestObjectDetection(image) {
  // console.log("requestObjectDetection", OBJECT_DETECTION_URL);
  const response = await axios({
    method: "POST",
    url: OBJECT_DETECTION_URL,
    data: {image}
  });
  // console.log(response);
  return response.data;
}

function formatKafkaMsg(data, file) {
  const msg = { ...data, file };
  return JSON.stringify(msg);
}

function sendKafkaMsg(fastify, jsonMsg) {
  fastify.log.debug(`kafka produce topic: ${KAFKA_TOPIC_IMAGES}; key: null; msg: ${jsonMsg}`);
  try {
    // let kafkaMsg = Buffer.from(jsonMsg);
    // let result = fastify.kafka.producer.produce(KAFKA_TOPIC, -1, kafkaMsg, null);
    let result = fastify.kafka.push({
      topic: KAFKA_TOPIC_IMAGES,
      payload: jsonMsg,
      key: null,
    });
    fastify.log.debug("Pushed message", result, jsonMsg);
  } catch (error) {
    fastify.log.error("kafka producer failed to send message. Error: ", error.message);
  }
}
