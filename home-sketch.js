var planets = [];

var speed;

var spaceDimensions = {
    x: 2000,
    y: 2000,
    z: 800000
  };

let cameraCoords = {
    x: spaceDimensions.x/2,
    y: spaceDimensions.y/2,
    z: 0
  };



function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('myCanvasContainer');
    angleMode(DEGREES); // Set angle mode to degrees
    for (var i = 0; i < 1800; i++) {
        planets[i] = new Planet();
    }
    rectMode(CENTER); // Draw the rectangle from its center
}

function draw() {
    background(color('#E6FFFF'))
    fill(0,0)
    stroke(color('#0000E9'))

    translate(width / 2, height / 2);
    rotate(45); // Rotate by 45 degrees

    for (var i = 0; i < planets.length; i++) {
      planets[i].show();
    }
}



// window.addEventListener('scroll', () => {
//     cameraCoords.z = map(window.scrollY, 0, height, 0, spaceDimensions.z*.8)
//   });


const slider = document.getElementById('mySlider');

slider.oninput = function() {
    console.log(this.value)
    cameraCoords.z = map(this.value, 1, 100, 0, spaceDimensions.z*.3)
}




// function draw() {
//   speed = map(mouseX, 0, width, 0, 50);
//   background(0);
//   translate(width / 2, height / 2);
//   for (var i = 0; i < planets.length; i++) {
//     planets[i].update();
//     planets[i].show();
//   }
// }