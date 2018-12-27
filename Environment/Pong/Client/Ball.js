class Ball {
  constructor (x, y, radius) {
    this.id = 'ball' + guid()
    this.x = x
    this.y = y
    this.radius = radius

    this.svg = svgElement('circle', {
      'id': this.id,
      'cx': this.x,
      'cy': this.y,
      'r': this.radius,
      'fill': '#fff'
    })
  }

  appendTo (parent) {
    parent.appendChild(this.svg)
  }

  setPosition (x, y) {
    this.x = x
    this.y = y

    this.svg.setAttribute('cx', this.x)
    this.svg.setAttribute('cy', this.y)
  }
}