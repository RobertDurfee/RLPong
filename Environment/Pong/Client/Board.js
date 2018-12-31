class Board {
  constructor (height, width) {
    this.id = 'board' + guid()
    this.height = height
    this.width = width

    this.svg = svgElement('svg', {
      'id': this.id,
      'height': this.height,
      'width': this.width,
      'style': 'background-color: #000;'
    })
  }

  appendTo (parent) {
    parent.appendChild(this.svg)
  }
}