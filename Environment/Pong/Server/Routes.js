const controller = require('./Controller')

module.exports = function (app) {
  app.route('/v1/pong/games')
    .post(controller.startGame)

  app.route('/v1/pong/games/:gameId')
    .get(controller.getGame)
    .delete(controller.endGame)

  app.route('/v1/pong/games/:gameId/paddles')
    .get(controller.getPaddles)
    .put(controller.movePaddles)

  app.route('/v1/pong/games/:gameId/ball')
    .get(controller.getBall)

  app.route('/v1/pong/games/:gameId/scores')
    .get(controller.getScores)
  
  app.route('/v1/pong/games/:gameId/hitcounts')
    .get(controller.getHitCounts)
}