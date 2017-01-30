// Toggles the style with name styleName on the tag, with either the value or
// the default value.
function toggleStyle(el, styleName, value) {
  // If the value of the field corresponding to styleName on the element's 
  // style field is '', then set it to value. Otherwise, reset it to ''.
  if (el.style[styleName] === '') {
    el.style[styleName] = value;
  }
  else {
    // Assume value of styleName will not be set to any other values
    el.style[styleName] = '';
  }
}

function onFormSubmit(e) {
  var form = e.target;
  // Prevent the form from actually submitting!  
  e.preventDefault();
  // Print values of foo input and bar input together to response div.
  var form = document.getElementById("our_form");
  var response = document.getElementById("response");
  response.innerHTML = form.foo.value + " " + form.bar.value; // span tag
}

function formAlert(e) {
  e.preventDefault();
  var form = document.getElementById("our_form");
  alert("foo: " + form.foo.value + "\n" + "bar: " + form.bar.value);
}

function toggleBox(e) {
  var box = document.getElementById("box");
  // Toggle the visibility of the box
  toggleStyle(box, "display", "none");
}

function rotateColors(e) {
  var box = document.getElementById("box");
  // Rotate the colors of the box from red to blue to green.
  if (box.style["background-color"].toLowerCase() === "red") {
    box.style["background-color"] = "blue";
  }
  else if (box.style["background-color"].toLowerCase() === "blue") {
    box.style["background-color"] = "green";
  }
  else {
    box.style["background-color"] = "red";
  }
}

function onTagButtonClick(e) {
  var el = e.target;
  var tagsEl = document.getElementById("tags");

  var bTags;
  var style;

  if (el.id === "bold-btn") {
    // Toggle bold words red
    bTags = tagsEl.getElementsByTagName("b");
    style = {name: "color", value: "red"};
  }
  else if (el.id === "italic-btn") {
    // Toggle italic words' bg color grey
    bTags = tagsEl.getElementsByTagName("i");
    style = {name: "background-color", value: "gray"};
  }
  else if (el.id === "underline-btn") {
    // Toggle underlined words' border 
    bTags = tagsEl.getElementsByTagName("u");
    style = {name: "border", value: "1px solid blue"};
  }
  else {
    return;
  }

  for (var i = 0; i < bTags.length; i++) {
    toggleStyle(bTags[i], style.name, style.value);
  }

}

function initCanvas() {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  c.style["background-color"] = "#ddd";
  ctx.clearRect(0, 0, c.width, c.height);
  console.log("cleared");
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
  
  // Fill a rectangle with a random color, with a width between 50 and
  // 200 and a height between 50 and 100, such that it is centered around the
  // point (mouseX, mouseY)

  var width = randomRange(50, 200);
  var height = randomRange(50, 100);

  ctx.fillStyle = randomColor();
  ctx.fillRect(mouseX - (width / 2), mouseY - (height / 2), width, height);
  ctx.beginPath();
}

function randomColor() {
  var r = (Math.random() * 256 | 0).toString(16);
  var g = (Math.random() * 256 | 0).toString(16);
  var b = (Math.random() * 256 | 0).toString(16);
  return "#" + r + g + b;
}

function randomRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}
