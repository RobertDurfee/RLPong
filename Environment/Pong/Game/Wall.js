class Wall {
  constructor (type, edge) {
    this.setState(type, edge)
  }

  getState () {
    return {
      'type': this.type,
      'edge': this.edge
    }
  }

  setState (type, edge) {
    this.type = type
    this.edge = edge
  }

  doesBounce (ball) {
    if (this.type === 'lower') {
      return ((ball['y'] + ball['radius']) >= this.edge)
    } else if (this.type === 'upper') {
      return ((ball['y'] - ball['radius']) <= this.edge)
    } else if (this.type === 'right') {
      return ((ball['x'] + ball['radius']) >= this.edge)
    } else if (this.type === 'left') {
      return ((ball['x'] - ball['radius']) <= this.edge)
    }
  }

  bounce (ball) {
    ball.setTrajectory(ball['dx'], -ball['dy'])
    return ball
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Wall
}