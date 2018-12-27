async function startGame (boardHeight, boardWidth, goalWidth, ballRadius, ballSpeed, ballMaxSpeed, paddleHeight, paddleWidth, paddleSpeed, maxAngle, paddlePadding) {
  const response = await fetch('http://localhost:21052/v1/pong/games', {
    'method': 'POST',
    'body': JSON.stringify({
      'boardHeight': boardHeight,
      'boardWidth': boardWidth,
      'goalWidth': goalWidth,
      'ballRadius': ballRadius,
      'ballSpeed': ballSpeed,
      'ballMaxSpeed': ballMaxSpeed,
      'paddleHeight': paddleHeight,
      'paddleWidth': paddleWidth,
      'paddleSpeed': paddleSpeed,
      'maxAngle': maxAngle,
      'paddlePadding': paddlePadding
    }),
    'headers': {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

async function endGame (gameId) {
  const response = await fetch('http://localhost:21052/v1/pong/games/' + gameId, {
    'method': 'DELETE'
  })
  return await response.json()
}

async function getGame (gameId) {
  const response = await fetch('http://localhost:21052/v1/pong/games/' + gameId, {
    'method': 'GET'
  })
  return await response.json()
}

async function getPaddles (gameId) {
  const response = await fetch('http://localhost:21052/v1/pong/games/' + gameId + '/paddles', {
    'method': 'GET'
  })
  return await response.json()
}

async function movePaddles (gameId, playerOne, playerTwo) {
  const response = await fetch('http://localhost:21052/v1/pong/games/' + gameId + '/paddles', {
    'method': 'PUT',
    'body': JSON.stringify({
      'playerOne': playerOne,
      'playerTwo': playerTwo
    }),
    'headers': {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

async function getBall (gameId) {
  const response = await fetch('http://localhost:21052/v1/pong/games/' + gameId + '/ball', {
    'method': 'GET'
  })
  return await response.json()
}

async function getScores (gameId) {
  const response = await fetch('http://localhost:21052/v1/pong/games/' + gameId + '/scores', {
    'method': 'GET'
  })
  return await response.json()
}

async function getHitCounts (gameId) {
  const response = await fetch('http://localhost:21052/v1/pong/games/' + gameId + '/hitcounts', {
    'method': 'GET'
  })
  return await response.json()
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports.startGame = startGame
  module.exports.endGame = endGame
  module.exports.getGame = getGame
  module.exports.getPaddles = getPaddles
  module.exports.movePaddles = movePaddles
  module.exports.getBall = getBall
  module.exports.getScores = getScores
  module.exports.getHitCounts = getHitCounts
}
