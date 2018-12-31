class Ball {
  constructor (x, y, dx, dy, radius, speed, minSpeed, maxSpeed) {
    this.setState(x, y, dx, dy, radius, speed, minSpeed, maxSpeed)
  }

  getState () {
    return {
      'x': this.x,
      'y': this.y,
      'dx': this.dx,
      'dy': this.dy,
      'radius': this.radius,
      'speed': this.speed,
      'minSpeed': this.minSpeed,
      'maxSpeed': this.maxSpeed
    }
  }

  setState (x, y, dx, dy, radius, speed, minSpeed, maxSpeed) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.speed = speed
    this.minSpeed = minSpeed
    this.maxSpeed = maxSpeed
  }

  setSpeed (speed) {
    this.speed = speed
  }

  increaseMaxSpeed (multiple) {
    this.maxSpeed = this.maxSpeed + this.maxSpeed * multiple
  }

  setTrajectory (dx, dy) {
    this.dx = dx
    this.dy = dy
  }

  move () {
    this.x += this.dx * this.speed
    this.y += this.dy * this.speed
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Ball
}