var body = document.getElementsByTagName('body')[0]

const boardHeight = 525
const boardWidth = 858
const goalWidth = 175
const ballRadius = 4
const ballMinSpeed = 3
const ballMaxSpeed = 5
const paddleHeight = 37
const paddleWidth = 7
const paddleSpeed = 10
const maxAngle = 60
const paddlePadding = 30

var board = new Board(boardHeight, boardWidth)
board.appendTo(body)

var ball = new Ball(boardWidth / 2, boardHeight / 2, ballRadius)
ball.appendTo(board.svg)

var playerOnePaddle = new Paddle(paddleHeight, paddleWidth, goalWidth, boardHeight / 2)
var playerTwoPaddle = new Paddle(paddleHeight, paddleWidth, boardWidth - goalWidth, boardHeight / 2)
playerOnePaddle.appendTo(board.svg)
playerTwoPaddle.appendTo(board.svg)

var stats = new Stats('ball-x', 'ball-y', 'ball-speed', 'player-one-score', 'player-two-score', 'player-one-hit-count', 'player-two-hit-count')

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

var playerOneUpPressed = false
var playerOneDownPressed = false
var playerTwoUpPressed = false
var playerTwoDownPressed = false

function keyDownHandler (event) {
  switch (event.key) {
    case 'f':
      playerOneDownPressed = true
      break
    case 'd':
      playerOneUpPressed = true
      break
    case 'k':
      playerTwoUpPressed = true
      break
    case 'j':
      playerTwoDownPressed = true
      break
  }
}

function keyUpHandler (event) {
  switch (event.key) {
    case 'f':
      playerOneDownPressed = false
      break
    case 'd':
      playerOneUpPressed = false
      break
    case 'k':
      playerTwoUpPressed = false
      break
    case 'j':
      playerTwoDownPressed = false
      break
  }
}

async function update () {
  let game = await getGame(gameId)
  ball.setPosition(game['ball']['x'], game['ball']['y'])

  stats.setStats(game['ball']['x'], game['ball']['y'], game['ball']['speed'], game['scores']['playerOne'], game['scores']['playerTwo'], game['hitCounts']['playerOne'], game['hitCounts']['playerTwo'])

  if (playerOneUpPressed || playerOneDownPressed || playerTwoUpPressed || playerTwoDownPressed) {
    paddles = await movePaddles(gameId, {
      'up': playerOneUpPressed ? 1 : 0,
      'down': playerOneDownPressed ? 1 : 0
    }, {
      'up': playerTwoUpPressed ? 1 : 0,
      'down': playerTwoDownPressed ? 1 : 0
    })

    playerOnePaddle.setPosition(paddles['playerOne']['x'], paddles['playerOne']['y'])
    playerTwoPaddle.setPosition(paddles['playerTwo']['x'], paddles['playerTwo']['y'])
  }
}

var gameId

startGame(boardHeight, boardWidth, goalWidth, ballRadius, ballMinSpeed, ballMaxSpeed, paddleHeight, paddleWidth, paddleSpeed, maxAngle, paddlePadding)
  .then(game => {
    gameId = game.id
    setInterval(update, 16.67)
  })
