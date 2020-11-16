"use strict";

const path = require("path");
const Static = require("fastify-static");
const AutoLoad = require("fastify-autoload");
const Sensible = require("fastify-sensible");
const Kafka = require("fastify-kafka");
const kafkaConsumerConfig = require("./kafka/consumer").config;
const kafkaConsumerSetup = require("./kafka/consumer").setup;

module.exports = async function (fastify, opts) {

  fastify.register(Sensible);

  fastify.register(Static, {
    root: path.join(__dirname, "frontend/build"),
    wildcard: false,
  });

  fastify.register(Kafka, {
    consumer: kafkaConsumerConfig
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  fastify.ready(() => {
    kafkaConsumerSetup(fastify);
  });

};
