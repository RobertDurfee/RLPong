const guid = require('../../guid')
const fork = require('child_process').fork

const children = {}
const callbacks = {}

exports.startGame = function (req, res) {
  let gameId = guid()
  children[gameId] = fork('../Game/Game.js', [
    '--id=' + gameId,
    '--boardHeight=' + req.body.boardHeight,
    '--boardWidth=' + req.body.boardWidth,
    '--goalWidth=' + req.body.goalWidth,
    '--ballRadius=' + req.body.ballRadius,
    '--ballSpeed=' + req.body.ballSpeed,
    '--ballMaxSpeed=' + req.body.ballMaxSpeed,
    '--paddleHeight=' + req.body.paddleHeight,
    '--paddleWidth=' + req.body.paddleWidth,
    '--paddleSpeed='+ req.body.paddleSpeed,
    '--maxAngle=' + req.body.maxAngle,
    '--paddlePadding=' + req.body.paddlePadding
  ], { stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ] })

  console.log('Started game ' + gameId)

  let callbackId = gameId
  callbacks[callbackId] = (message) => {
    if (message['id'] === callbackId) {
      children[gameId].removeListener('message', callbacks[callbackId])
      delete callbacks[callbackId]

      res.json(message)
    }
  }
  children[gameId].on('message', callbacks[callbackId])
}

exports.getGame = function (req, res) {
  let gameId = req.params.gameId

  if (!(gameId in children)) {
    res.status(404).end()
    return
  }

  let callbackId = guid()
  callbacks[callbackId] = message => {
    if (message['id'] === callbackId) {
      children[gameId].removeListener('message', callbacks[callbackId])
      delete callbacks[callbackId]

      delete message['id']
      res.json(message)
    }
  }
  children[gameId].on('message', callbacks[callbackId])
  children[gameId].send({ 'type': 'getGame', 'id': callbackId })
}

exports.endGame = function (req, res) {
  let gameId = req.params.gameId

  if (!(gameId in children)) {
    res.status(404).end()
    return
  }

  children[gameId].kill()

  if (children[gameId].killed) {
    delete children[gameId]
    res.status(200).end()
    console.log('Killed game ' + gameId)
  } else {
    res.status(500).end()
  }
}

exports.getPaddles = function (req, res) {
  let gameId = req.params.gameId

  if (!(gameId in children)) {
    res.status(404).end()
    return
  }

  let callbackId = guid()
  callbacks[callbackId] = message => {
    if (message['id'] === callbackId) {
      children[gameId].removeListener('message', callbacks[callbackId])
      delete callbacks[callbackId]

      delete message['id']
      res.json(message)
    }
  }
  children[gameId].on('message', callbacks[callbackId])
  children[gameId].send({ 'type': 'getPaddles', 'id': callbackId })
}

exports.movePaddles = function (req, res) {
  let gameId = req.params.gameId

  if (!(gameId in children)) {
    res.status(404).end()
    return
  }

  let playerOne = req.body.playerOne
  if (typeof playerOne === 'undefined') {
    playerOne = { 'up': 0, 'down': 0 }
  }

  let playerTwo = req.body.playerTwo
  if (typeof playerTwo === 'undefined') {
    playerTwo = { 'up': 0, 'down': 0 }
  }

  let callbackId = guid()
  callbacks[callbackId] = message => {
    if (message['id'] === callbackId) {
      children[gameId].removeListener('message', callbacks[callbackId])
      delete callbacks[callbackId]

      delete message['id']
      res.json(message)
    }
  }
  children[gameId].on('message', callbacks[callbackId])
  children[gameId].send({ 'type': 'movePaddles', 'id': callbackId, 'playerOne': playerOne, 'playerTwo': playerTwo })
}

exports.getBall = function (req, res) {
  let gameId = req.params.gameId

  if (!(gameId in children)) {
    res.status(404).end()
    return
  }

  let callbackId = guid()
  callbacks[callbackId] = message => {
    if (message['id'] === callbackId) {
      children[gameId].removeListener('message', callbacks[callbackId])
      delete callbacks[callbackId]

      delete message['id']
      res.json(message)
    }
  }
  children[gameId].on('message', callbacks[callbackId])
  children[gameId].send({ 'type': 'getBall', 'id': callbackId })
}

exports.getScores = function (req, res) {
  let gameId = req.params.gameId

  if (!(gameId in children)) {
    res.status(404).end()
    return
  }

  let callbackId = guid()
  callbacks[callbackId] = message => {
    if (message['id'] === callbackId) {
      children[gameId].removeListener('message', callbacks[callbackId])
      delete callbacks[callbackId]

      delete message['id']
      res.json(message)
    }
  }
  children[gameId].on('message', callbacks[callbackId])
  children[gameId].send({ 'type': 'getScores', 'id': callbackId })
}

exports.getHitCounts = function (req, res) {
  let gameId = req.params.gameId

  if (!(gameId in children)) {
    res.status(404).end()
    return
  }

  let callbackId = guid()
  callbacks[callbackId] = message => {
    if (message['id'] === callbackId) {
      children[gameId].removeListener('message', callbacks[callbackId])
      delete callbacks[callbackId]

      delete message['id']
      res.json(message)
    }
  }
  children[gameId].on('message', callbacks[callbackId])
  children[gameId].send({ 'type': 'getHitCounts', 'id': callbackId })
}