class Paddle {
  constructor (type, height, width, x, y, speed, maxAngle, upperBound, lowerBound) {
    this.setState(type, height, width, x, y, speed, maxAngle, upperBound, lowerBound)
  }

  getState () {
    return {
      'type': this.type,
      'height': this.height,
      'width': this.width,
      'x': this.x,
      'y': this.y,
      'speed': this.speed,
      'maxAngle': this.maxAngle,
      'upperBound': this.upperBound,
      'lowerBound': this.lowerBound
    }
  }

  setState (type, height, width, x, y, speed, maxAngle, upperBound, lowerBound) {
    this.type = type
    this.height = height
    this.width = width
    this.yRadius = this.height / 2
    this.xRadius = this.width / 2
    this.x = x
    this.y = y
    this.speed = speed
    this.maxAngle = maxAngle
    this.upperBound = upperBound
    this.lowerBound = lowerBound
  }

  doesBounce (ball) {
    if (this.type === 'left') {
      // Does contact paddle in x-direction
      if ((ball['x'] - ball['radius']) <= (this.x + this.xRadius)) {
        // Within paddle bounds
        return ((this.y - this.yRadius) <= (ball['y'] + ball['radius'])
          && (ball['y'] - ball['radius']) <= (this.y + this.yRadius))
      }
    } else {
      // Does contact paddle in x-direction
      if ((ball['x'] + ball['radius']) >= (this.x - this.xRadius)) {
        // Within paddle bounds
        return ((this.y - this.yRadius) <= (ball['y'] + ball['radius']) 
          && (ball['y'] - ball['radius']) <= (this.y + this.yRadius))
      }
    }
    return false
  }

  // Normalized within [-1, 1] (approximately)
  impact (y) {
    return (y - this.y) / this.yRadius
  }

  trajectory (angle) {
    var dx = Math.cos(angle * Math.PI / 180)
    var dy = Math.sin(angle * Math.PI / 180)
    if (this.type === 'right') {
      dx = -dx
    }
    return { 'dx': dx, 'dy': dy }
  }

  bounce (ball) {
    var impact = this.impact(ball['y'])

    var speed = ball['maxSpeed'] * Math.abs(impact)
    ball.setSpeed(speed)

    var angle = this.maxAngle * impact
    var trajectory = this.trajectory(angle)
    ball.setTrajectory(trajectory['dx'], trajectory['dy'])

    return ball
  }

  move (direction) {
    if (direction === 'up') {
      if ((this.y - this.yRadius) > this.upperBound) {
        this.y -= this.speed
      }
    } else {
      if ((this.y + this.yRadius) < this.lowerBound) {
        this.y += this.speed
      }
    }
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Paddle
}