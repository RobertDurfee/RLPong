class Stats {
  constructor (ballXId, ballYId, ballSpeedId, playerOneScoreId, playerTwoScoreId, playerOneHitCountId, playerTwoHitCountId) {
    this.ballXId = ballXId
    this.ballYId = ballYId
    this.ballSpeedId = ballSpeedId
    this.playerOneScoreId = playerOneScoreId
    this.playerTwoScoreId = playerTwoScoreId
    this.playerOneHitCountId = playerOneHitCountId
    this.playerTwoHitCountId = playerTwoHitCountId
  }

  setStats (ballX, ballY, ballSpeed, playerOneScore, playerTwoScore, playerOneHitCount, playerTwoHitCount) {
    document.getElementById(this.ballXId).setAttribute('value', ballX)
    document.getElementById(this.ballYId).setAttribute('value', ballY)
    document.getElementById(this.ballSpeedId).setAttribute('value', ballSpeed)
    document.getElementById(this.playerOneScoreId).setAttribute('value', playerOneScore)
    document.getElementById(this.playerTwoScoreId).setAttribute('value', playerTwoScore)
    document.getElementById(this.playerOneHitCountId).setAttribute('value', playerOneHitCount)
    document.getElementById(this.playerTwoHitCountId).setAttribute('value', playerTwoHitCount)
  }
}