async function initHandler(fastify, conn, messageObj) {
  fastify.log.debug("initHandler", messageObj);
  initUser(fastify, conn, messageObj)
  conn.socket.send(JSON.stringify({ initialized: true }));
}

async function initUser(fastify, conn, {userId}) {
  fastify.log.debug('initUser', userId);
  let user;

  //combination of userKey + gameId should be unique
  if (userKey && gameId === global.game.id) {
    user = await getExistingUser(userKey)
    if (user.id !== userId) {
      user = await createNewUser();
    }
  } else {
    user = await createNewUser();
  }

  if (user) {
    global.users[user.key] = {...user, ws};
  }
  return user;
}

module.exports = initHandler;
