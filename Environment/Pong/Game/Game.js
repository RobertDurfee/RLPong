const Wall = require('./Wall')
const Goal = require('./Goal')
const Paddle = require('./Paddle')
const Ball = require('./Ball')

function randomSign () {
  return Math.floor(Math.random() * 2) == 1 ? 1 : -1
}

function randomTrajectory (minSpeed, maxSpeed, maxAngle, sign) {
  var rnd = Math.random()

  var angle = rnd * maxAngle * randomSign()

  var dx = sign * Math.cos(angle * Math.PI / 180)
  var dy = Math.sin(angle * Math.PI / 180)

  var speed = (maxSpeed - minSpeed) * rnd + minSpeed

  return { 'dx': dx, 'dy': dy, 'speed': speed }
}

module.exports = class Game {
  constructor (id, boardHeight, boardWidth, goalWidth, ballRadius, ballMinSpeed, ballMaxSpeed, maxAngle, paddleHeight, paddleWidth, paddleSpeed, paddlePadding) {
    this.id = id
    this.boardHeight = boardHeight
    this.boardWidth = boardWidth
    this.goalWidth = goalWidth
    this.ballRadius = ballRadius
    this.ballMinSpeed = ballMinSpeed
    this.ballMaxSpeed = ballMaxSpeed
    this.maxAngle = maxAngle
    this.paddleHeight = paddleHeight
    this.paddleWidth = paddleWidth
    this.paddleSpeed = paddleSpeed
    this.paddlePadding = paddlePadding
    this.playerOneHitCount = 0
    this.playerTwoHitCount = 0
    this.playerOneScore = 0
    this.playerTwoScore = 0

    this.upperWall = new Wall('upper', 0)
    this.lowerWall = new Wall('lower', this.boardHeight)
    this.leftWall = new Wall('left', 0)
    this.rightWall = new Wall('right', this.boardWidth)

    this.playerOneGoal = new Goal('left', this.goalWidth)
    this.playerTwoGoal = new Goal('right', this.boardWidth - this.goalWidth)

    this.playerOnePaddle = new Paddle('left', this.paddleHeight, this.paddleWidth, this.goalWidth, this.boardHeight / 2, this.paddleSpeed, this.maxAngle, this.paddlePadding, this.boardHeight - this.paddlePadding)
    this.playerTwoPaddle = new Paddle('right', this.paddleHeight, this.paddleWidth, this.boardWidth - this.goalWidth, this.boardHeight / 2, this.paddleSpeed, this.maxAngle, this.paddlePadding, this.boardHeight - this.paddlePadding)

    var trajectory = randomTrajectory(this.ballMinSpeed, this.ballMaxSpeed, this.maxAngle, randomSign())
    this.ball = new Ball(this.boardWidth / 2, this.boardHeight / 2, trajectory['dx'], trajectory['dy'], this.ballRadius, trajectory['speed'], this.ballMinSpeed, this.ballMaxSpeed)
  }

  getGame () {
    return {
      'board': this.getBoard(),
      'paddles': this.getPaddles(),
      'ball': this.getBall(),
      'scores': this.getScores(),
      'hitCounts': this.getHitCounts()
    }
  }

  getBoard () {
    return {
      'height': this.boardHeight,
      'width': this.boardWidth,
      'walls': this.getWalls(),
      'goals': this.getGoals()
    }
  }

  getWalls () {
    return {
      'upperWall': this.upperWall.getState(),
      'lowerWall': this.lowerWall.getState(),
      'leftWall': this.leftWall.getState(),
      'rightWall': this.rightWall.getState()
    }
  }

  getGoals () {
    return {
      'playerOne': this.playerOneGoal.getState(),
      'playerTwo': this.playerTwoGoal.getState()
    }
  }

  getPaddles () {
    return {
      'playerOne': this.playerOnePaddle.getState(),
      'playerTwo': this.playerTwoPaddle.getState()
    }
  }

  getBall () {
    return this.ball.getState()
  }

  getScores () {
    return {
      'playerOne': this.playerOneScore,
      'playerTwo': this.playerTwoScore
    }
  }

  getHitCounts () {
    return {
      'playerOne': this.playerOneHitCount,
      'playerTwo': this.playerTwoHitCount
    }
  }

  movePaddles (playerOneUp, playerOneDown, playerTwoUp, playerTwoDown) {
    var playerOneMoves = playerOneUp - playerOneDown
    if (playerOneMoves > 0) {
      for (var i = 0; i < playerOneMoves; i++) {
        this.playerOnePaddle.move('up')
      }
    } else {
      for (var i = 0; i < -playerOneMoves; i++) {
        this.playerOnePaddle.move('down')
      }
    }

    var playerTwoMoves = playerTwoUp - playerTwoDown
    if (playerTwoMoves > 0) {
      for (var i = 0; i < playerTwoMoves; i++) {
        this.playerTwoPaddle.move('up')
      }
    } else {
      for (var i = 0; i < -playerTwoMoves; i++) {
        this.playerTwoPaddle.move('down')
      }
    }

    return this.getPaddles()
  }

  liveUpdate () {
    if (this.upperWall.doesBounce(this.ball)) {
      this.ball = this.upperWall.bounce(this.ball)
    }
    
    if (this.lowerWall.doesBounce(this.ball)) {
      this.ball = this.lowerWall.bounce(this.ball)
    }

    if (this.playerOneGoal.doesReach(this.ball)) {
      if (this.playerOnePaddle.doesBounce(this.ball)) {
        this.playerOneHitCount++

        this.ball.increaseMaxSpeed(0.01)

        this.ball = this.playerOnePaddle.bounce(this.ball)
      } else {
        this.stopRound()
        this.startDeadRound()
        return
      }
    }

    if (this.playerTwoGoal.doesReach(this.ball)) {
      if (this.playerTwoPaddle.doesBounce(this.ball)) {
        this.playerTwoHitCount++

        this.ball.increaseMaxSpeed(0.01)

        this.ball = this.playerTwoPaddle.bounce(this.ball)
      } else {
        this.stopRound()
        this.startDeadRound()
        return
      }
    }

    this.ball.move()
  }

  deadUpdate () {
    if (this.upperWall.doesBounce(this.ball)) {
      this.ball = this.upperWall.bounce(this.ball)
    }
    
    if (this.lowerWall.doesBounce(this.ball)) {
      this.ball = this.lowerWall.bounce(this.ball)
    }

    if (this.leftWall.doesBounce(this.ball)) {
      this.playerTwoScore++

      var trajectory = randomTrajectory(this.ballMinSpeed, this.ballMaxSpeed, this.maxAngle, -1)
      this.ball = new Ball(this.boardWidth / 2, this.boardHeight / 2, trajectory['dx'], trajectory['dy'], this.ballRadius, trajectory['speed'], this.ballMinSpeed, this.ballMaxSpeed)

      this.stopRound()
      setTimeout(() => { this.startLiveRound() }, 2000)

      return
    }

    if (this.rightWall.doesBounce(this.ball)) {
      this.playerOneScore++

      var trajectory = randomTrajectory(this.ballMinSpeed, this.ballMaxSpeed, this.maxAngle, 1)
      this.ball = new Ball(this.boardWidth / 2, this.boardHeight / 2, trajectory['dx'], trajectory['dy'], this.ballRadius, trajectory['speed'], this.ballMinSpeed, this.ballMaxSpeed)

      this.stopRound()
      setTimeout(() => { this.startLiveRound() }, 2000)

      return
    }

    this.ball.move()
  }

  startLiveRound () {
    this.interval = setInterval(() => { this.liveUpdate() }, 50 / 3)  // 60 Hz
  }

  startDeadRound () {
    this.interval = setInterval(() => { this.deadUpdate() }, 50 / 3)  // 60 Hz
  }

  stopRound () {
    clearInterval(this.interval)
  }
}
