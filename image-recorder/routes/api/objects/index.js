"use strict";

const moment = require("moment");
const _ = require("lodash");
const axios = require("../../../utils/axios");
const storage = require("../../../utils/storage");
const { OBJECT_DETECTION_URL } = require("../../../utils/constants");
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
      return error;
    }

    // sendKafkaMsg(formatKafkaMsg(player));

    let inferenceResponse;
    try {
      inferenceResponse = await getObjects(base64data);
    } catch (error) {
      request.log.error("error occurred generating inference", error.message);
      // request.log.debug(error.stack);
      return error;
    }

    const inference = inferenceResponse.data;
    reply.code(201);
    return { inference };
  });
};

function getObjects(image) {
  const requestUrl = OBJECT_DETECTION_URL;
  console.log("requestUrl", requestUrl);
  return axios({
    method: "POST",
    url: requestUrl,
    data: { image },
  });
}

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

// function formatKafkaMsg(player) {
//   let {gameId, id, username, score, right, wrong, avatar, creationServer, gameServer, scoringServer} = player;
//   const msg = {
//     player: {
//       gameId,
//       id,
//       username,
//       score,
//       right,
//       wrong,
//       avatar,
//       creationServer, // can have duplicate user names on different clusters
//       gameServer, // current game server
//       scoringServer
//     }
//   };
//   return JSON.stringify(msg);
// }
//
// function sendKafkaMsg(jsonMsg) {
//   let kafkaMsg = Buffer.from(jsonMsg);
//
//   log.debug(`kafka produce topic: ${KAFKA_TOPIC}; key: null; msg: ${jsonMsg}`);
//
//   try {
//     let result = kafkaProducer.produce(KAFKA_TOPIC, -1, kafkaMsg, null);
//     log.debug('kafka producer sent guess transaction payload', result, jsonMsg);
//   } catch (error) {
//     log.error('kafka producer failed to send guess transaction payload.  Error: ', error.message);
//   }
// }
