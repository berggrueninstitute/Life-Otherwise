var planets = [];
var numStories = 16;
var domElements = document.getElementById("domElements")
var randomPlanetDescription = document.getElementById("randomPlanetDescription")
const menu = document.getElementById("planets-menu")
var mouseOverDiamond = 0

var speed;

var spaceDimensions = {
    x: 6000,
    y: 6000,
    z: 8000000
  };

let visibleDist = spaceDimensions.z * 0.05

let cameraCoords = {
    x: spaceDimensions.x/2,
    y: spaceDimensions.y/2,
    z: 0
  };



function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('myCanvasContainer');
    angleMode(DEGREES);
    for (var i = 0; i < 6000; i++) {
        planets[i] = new Planet(i, 6000);
    }
    // place stories on random planets
    for (let i = 0; i < articlePaths.length; i++) {
      let rand = Math.floor(Math.random() * planets.length-1000) + 1000;
      planets[rand].link = articlePaths[i];
      let hoverContainer = document.createElement("div");
      let menuPlanet = document.createElement("div");
      menuPlanet.classList.add('menuPlanetMarker')
      menu.appendChild(menuPlanet);
      planets[rand].description = document.createElement("div");
      planets[rand].description.innerHTML = planets[rand].link
      domElements.appendChild(hoverContainer);
      planets[rand].mark = document.createElement("div");
      let x = random()*spaceDimensions.x*2 - spaceDimensions.y*1
      let y = random()*spaceDimensions.y*2 - spaceDimensions.y*1
      planets[rand].x = x
      planets[rand].y = y
      planets[rand].mark.classList.add("planetMarker");
      planets[rand].description.classList.add("planetDescription")
      hoverContainer.appendChild(planets[rand].mark);
      hoverContainer.appendChild(planets[rand].description);
      planets[rand].markOffset = [random()-.5, random()-.5]
    }
  
    rectMode(CENTER); // Draw the rectangle from its center
}
let isAnyPlanetHovered = false;

function draw() {
    isAnyPlanetHovered = 0;
    background(color('#E6FFFF'))
    fill('#E6FFFF')
    stroke(color('#0000E9'))

    translate(width / 2, height / 2);
    // rotate(45); // Rotate by 45 degrees

    for (var i = 0; i < planets.length; i++) {
      planets[i].show();
    }
    if (!isAnyPlanetHovered) {
      document.getElementById("randomPlanetDescription").style.display = "none";
    }
}



// window.addEventListener('scroll', () => {
//     cameraCoords.z = map(window.scrollY, 0, height, 0, spaceDimensions.z*.8)
//   });


const slider = document.getElementById('mySlider');

slider.oninput = function() {
    cameraCoords.z = map(this.value, 1, 100, 0, spaceDimensions.z-visibleDist)
}









