const argv = require('yargs').argv
const Wall = require('./Wall')
const Goal = require('./Goal')
const Paddle = require('./Paddle')
const Ball = require('./Ball')

function randomSign () {
  return Math.floor(Math.random() * 2) == 1 ? 1 : -1
}

function randomTrajectory() {
  var dx = Math.random() * randomSign()
  var dy = Math.random() * randomSign()

  var norm = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) 

  dx /= norm
  dy /= norm

  return { 'dx': dx, 'dy': dy }
}

const id = argv['id']

const boardHeight = argv['boardHeight']
const boardWidth = argv['boardWidth']
var upperWall = new Wall('upper', 0)
var lowerWall = new Wall('lower', boardHeight)

const goalWidth = argv['goalWidth']
const leftGoalEdge = goalWidth
const rightGoalEdge = boardWidth - goalWidth
var playerOneGoal = new Goal('left', leftGoalEdge)
var playerTwoGoal = new Goal('right', rightGoalEdge)

const ballRadius = argv['ballRadius']
const ballMaxSpeed = argv['ballMaxSpeed']
const ballSpeed = argv['ballSpeed']
var trajectory = randomTrajectory()
var ball = new Ball(boardWidth / 2, boardHeight / 2, trajectory['dx'], trajectory['dy'], ballRadius, ballSpeed, ballMaxSpeed)

const paddleHeight = argv['paddleHeight']
const paddleWidth = argv['paddleWidth']
const paddleSpeed = argv['paddleSpeed']
const maxAngle = argv['maxAngle']
const paddlePadding = argv['paddlePadding']
const upperBound = paddlePadding
const lowerBound = boardHeight - paddlePadding
var playerOnePaddle = new Paddle('left', paddleHeight, paddleWidth, leftGoalEdge, boardHeight / 2, paddleSpeed, maxAngle, upperBound, lowerBound)
var playerTwoPaddle = new Paddle('right', paddleHeight, paddleWidth, rightGoalEdge, boardHeight / 2, paddleSpeed, maxAngle, upperBound, lowerBound)

var playerOneHitCount = 0
var playerTwoHitCount = 0
var playerOneScore = 0
var playerTwoScore = 0

process.on('message', message => {
  switch (message['type']) {
    case 'getGame':
      process.send({
        'id': message['id'],
        'board': {
          'height': boardHeight,
          'width': boardWidth,
          'goals': {
            'playerOne': playerOneGoal.getState(),
            'playerTwo': playerTwoGoal.getState()
          },
          'walls': {
            'upperWall': upperWall.getState(),
            'lowerWall': lowerWall.getState()
          }
        },
        'paddles': {
          'playerOne': playerOnePaddle.getState(),
          'playerTwo': playerTwoPaddle.getState()
        },
        'ball': ball.getState(),
        'scores': {
          'playerOne': playerOneScore,
          'playerTwo': playerTwoScore
        },
        'hitCounts': {
          'playerOne': playerOneHitCount,
          'playerTwo': playerTwoHitCount
        }
      })
      break
    case 'getPaddles':
      process.send({
        'id': message['id'],
        'playerOne': playerOnePaddle.getState(),
        'playerTwo': playerTwoPaddle.getState()
      })
      break
    case 'movePaddles':
      playerOneMoves = message['playerOne']['up'] - message['playerOne']['down']
      if (playerOneMoves > 0) {
        for (i = 0; i < playerOneMoves; i++) {
          playerOnePaddle.move('up')
        }
      } else {
        for (i = 0; i < -playerOneMoves; i++) {
          playerOnePaddle.move('down')
        }
      }

      playerTwoMoves = message['playerTwo']['up'] - message['playerTwo']['down']
      if (playerTwoMoves > 0) {
        for (i = 0; i < playerTwoMoves; i++) {
          playerTwoPaddle.move('up')
        }
      } else {
        for (i = 0; i < -playerTwoMoves; i++) {
          playerTwoPaddle.move('down')
        }
      }

      process.send({
        'id': message['id'],
        'playerOne': playerOnePaddle.getState(),
        'playerTwo': playerTwoPaddle.getState()
      })
      break
    case 'getBall':
      ballState = ball.getState()
      ballState['id'] = message['id']
      process.send(ballState)
      break
    case 'getScores':
      process.send({
        'id': message['id'],
        'playerOne': playerOneScore,
        'playerTwo': playerTwoScore
      })
      break
    case 'getHitCounts':
      process.send({
        'id': message['id'],
        'playerOne': playerOneHitCount,
        'playerTwo': playerTwoHitCount
      })
      break
  }
})

function update() {
  if (upperWall.doesBounce(ball)) {
    ball = upperWall.bounce(ball)
  }
  
  if (lowerWall.doesBounce(ball)) {
    ball = lowerWall.bounce(ball)
  }

  if (playerOneGoal.doesReach(ball)) {
    if (playerOnePaddle.doesBounce(ball)) {
      playerOneHitCount++
      ball = playerOnePaddle.bounce(ball)
    } else {
      playerTwoScore++
      trajectory = randomTrajectory()
      ball = new Ball(boardWidth / 2, boardHeight / 2, trajectory['dx'], trajectory['dy'], ballRadius, ballSpeed, ballMaxSpeed)
      return
    }
  }

  if (playerTwoGoal.doesReach(ball)) {
    if (playerTwoPaddle.doesBounce(ball)) {
      playerTwoHitCount++
      ball = playerTwoPaddle.bounce(ball)
    } else {
      playerOneScore++
      trajectory = randomTrajectory()
      ball = new Ball(boardWidth / 2, boardHeight / 2, trajectory['dx'], trajectory['dy'], ballRadius, ballSpeed, ballMaxSpeed)
      return
    }
  }

  ball.move()
}

if (process.send) {
  process.send({
    'id': id,
    'board': {
      'height': boardHeight,
      'width': boardWidth,
      'goals': {
        'playerOne': playerOneGoal.getState(),
        'playerTwo': playerTwoGoal.getState()
      },
      'walls': {
        'upperWall': upperWall.getState(),
        'lowerWall': lowerWall.getState()
      }
    },
    'paddles': {
      'playerOne': playerOnePaddle.getState(),
      'playerTwo': playerTwoPaddle.getState()
    },
    'ball': ball.getState(),
    'scores': {
      'playerOne': playerOneScore,
      'playerTwo': playerTwoScore
    },
    'hitCounts': {
      'playerOne': playerOneHitCount,
      'playerTwo': playerTwoHitCount
    }
  })
}

setInterval(update, 10)
