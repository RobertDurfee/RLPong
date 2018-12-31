class Paddle {
  constructor (height, width, x, y) {
    this.id = 'paddle' + guid()
    this.height = height
    this.width = width
    this.yRadius = this.height / 2
    this.xRadius = this.width / 2
    this.x = x
    this.y = y

    this.svg = svgElement('rect', {
      'id': this.id,
      'height': this.height,
      'width': this.width,
      'x': this.x - this.xRadius,
      'y': this.y - this.yRadius,
      'fill': '#fff'
    })
  }

  appendTo (parent) {
    parent.appendChild(this.svg)
  }

  setPosition (x, y) {
    this.x = x
    this.y = y

    this.svg.setAttribute('x', this.x - this.xRadius)
    this.svg.setAttribute('y', this.y - this.yRadius)
  }
}