// Toggles the style with name styleName on the tag, with either the value or
// the default value.
function toggleStyle(el, styleName, value) {
  // TODO: if the value of the field corresponding to styleName on the
  // element's style field is '', then set it to value. Otherwise, reset it to
  // ''. e.g. if styleName = "color", we are trying to access the color field
  // on the style field of element.
}

function onFormSubmit(e) {
  var form = e.target;
  // TODO: Prevent the form from actually submitting!  

  // TODO: Print values of foo input and bar input together to response div.
}

function formAlert(e) {
  // TODO
}

function toggleBox(e) {
  var box = document.getElementById("box");
  // TODO: Toggle the display of the box
}

function rotateColors(e) {
  var box = document.getElementById("box");
  // TODO: Rotate the colors of the box from red to blue to green.
}

function onTagButtonClick(e) {
  var el = e.target;
  var tagsEl = document.getElementById("tags");
  // TODO: Check for the id here and determine which values to toggle. Then
  // loop over all the tags you find and toggle the appropriate values.
}

function initCanvas() {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  // TODO: Fill the canvas with the color #ddd
}

function randomColor() {
  var r = (Math.random() * 256 | 0).toString(16);
  var g = (Math.random() * 256 | 0).toString(16);
  var b = (Math.random() * 256 | 0).toString(16);
  return "#" + r + g + b;
}

function drawBox(e) {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");

  // Firefox doesn't set offsetX/offsetY.
  if(!e.hasOwnProperty('offsetX')) {
    e.offsetX = e.layerX - e.currentTarget.offsetLeft;
    e.offsetY = e.layerY - e.currentTarget.offsetTop;
  }
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;
  
  // TODO: Fill a rectangle with a random color, with a width between 50 and
  // 200 and a height between 50 and 100, such that it is centered around the
  // point (mouseX, mouseY)
}
