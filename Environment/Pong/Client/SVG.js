function svgElement (name, attributes) {
  name = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (var attribute in attributes)
    name.setAttributeNS(null, attribute, attributes[attribute]);
  return name
}
