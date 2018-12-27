class Goal {
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

  doesReach (ball) {
    if (this.type === 'left') {
      return ((ball['x'] - ball['radius']) <= this.edge)
    } else {
      return ((ball['x'] + ball['radius']) >= this.edge)
    }
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Goal
}