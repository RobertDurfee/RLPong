const argv = require('yargs').argv
const Game = require('./Game')

var game = new Game(argv['id'], argv['boardHeight'], argv['boardWidth'], argv['goalWidth'], argv['ballRadius'], argv['ballMinSpeed'], argv['ballMaxSpeed'], argv['maxAngle'], argv['paddleHeight'], argv['paddleWidth'], argv['paddleSpeed'], argv['paddlePadding'])

process.on('message', request => {
  switch (request['type']) {
    case 'getGame':
      var response = game.getGame()
      response['id'] = request['id']
      process.send(response)
      break
    case 'getPaddles':
      var response = game.getPaddles()
      response['id'] = request['id']
      process.send(response)
      break
    case 'movePaddles':
      var response = game.movePaddles(request['playerOne']['up'], request['playerOne']['down'], request['playerTwo']['up'], request['playerTwo']['down'])
      response['id'] = request['id']
      process.send(response)
      break
    case 'getBall':
      var response = game.getBall()
      response['id'] = request['id']
      process.send(response)
      break
    case 'getScores':
      var response = game.getScores()
      response['id'] = request['id']
      process.send(response)
      break
    case 'getHitCounts':
      var response = game.getHitCounts()
      response['id'] = request['id']
      process.send(response)
      break
  }
})

if (process.send) {
  var response = game.getGame()
  response['id'] = game.id
  process.send(response)
}

game.startLiveRound()