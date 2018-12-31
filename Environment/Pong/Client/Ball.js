class Ball {
  constructor (x, y, radius) {
    this.id = 'ball' + guid()
    this.x = x
    this.y = y
    this.radius = radius

    this.svg = svgElement('rect', {
      'id': this.id,
      'height': 2 * this.radius,
      'width': 2 * this.radius,
      'x': this.x - this.radius,
      'y': this.y - this.radius,
      'fill': '#fff'
    })
  }

  appendTo (parent) {
    parent.appendChild(this.svg)
  }

  setPosition (x, y) {
    this.x = x
    this.y = y

    this.svg.setAttribute('x', this.x - this.radius)
    this.svg.setAttribute('y', this.y - this.radius)
  }
}