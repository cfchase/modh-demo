'use strict';

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return {'status': 'OK'}
  })
};
