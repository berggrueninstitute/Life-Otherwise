var aiDescriptions = [`<h4>ZAARA</h4>
  <p>A lush and vibrant planet with floating islands amidst colorful clouds.</p>
  </p>Primarily composed of a dense atmosphere rich in oxygen and nitrogen, resulting in the colorful clouds that blanket its sky. The floating islands – a combination of lightweight minerals and gases – are held aloft by the planet's gravitational anomalies. A variety of exotic flora and fauna thrive on these islands, creating an ever-changing and enchanting landscape. The planet's atmosphere is conducive to soft breezes and gentle rustling sounds, giving rise to a harmonious symphony of nature.</p>
  <p>(AI Generated)</p>`
];

var planets = [];
var numStories = 16;
var domElements = document.getElementById("domElements")
var randomPlanetDescription = document.getElementById("randomPlanetDescription")
const menu = document.getElementById("planets-menu")
var mouseOverDiamond = 0
var links;

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
let targetZoom = cameraCoords.z;




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
      let hoverContainer = document.createElement("a");
      hoverContainer.href = articlePaths[i][0];
      let menuLink = document.createElement("a");
      menuLink.href = articlePaths[i][0];
      planets[rand].menuPlanet = document.createElement("div");
      planets[rand].menuPlanet.classList.add('linked', "object"+i, 'menuPlanetMarker')
      menuLink.appendChild(planets[rand].menuPlanet)
      menu.appendChild(menuLink);
      planets[rand].description = document.createElement("div");
      planets[rand].description.innerHTML = planets[rand].link[1]+"<br> —"+planets[rand].link[2]
      domElements.appendChild(hoverContainer);
      planets[rand].mark = document.createElement("div");
      planets[rand].mark.classList.add('linked',"object"+i);
      let x = random()*spaceDimensions.x*2 - spaceDimensions.y*1
      let y = random()*spaceDimensions.y*2 - spaceDimensions.y*1
      planets[rand].x = x
      planets[rand].y = y
      planets[rand].mark.classList.add("planetMarker");
      planets[rand].description.classList.add("planetDescription")
      hoverContainer.appendChild(planets[rand].mark);
      hoverContainer.appendChild(planets[rand].description);
      planets[rand].markOffset = [random()-.5, random()-.5];



      planets[rand].mark.addEventListener('mouseover', () => {
        planets[rand].menuPlanet.classList.add("hovered")
        planets[rand].mark.classList.add("hovered")
        // planets[rand].description.style.display = "block"
        planets[rand].showDescription = 1
      });

      planets[rand].mark.addEventListener('mouseout', () => {
        planets[rand].menuPlanet.classList.remove("hovered")
        planets[rand].mark.classList.remove("hovered")
        planets[rand].description.style.display = "none"
        planets[rand].showDescription = 0
      });

      planets[rand].menuPlanet.addEventListener('mouseover', () => {
        planets[rand].menuPlanet.classList.add("hovered")
        planets[rand].mark.classList.add("hovered")
        planets[rand].description.style.display = "block"
        planets[rand].showDescription = 1
      });

      planets[rand].menuPlanet.addEventListener('mouseout', () => {
        planets[rand].menuPlanet.classList.remove("hovered")
        planets[rand].mark.classList.remove("hovered")
        planets[rand].description.style.display = "none"
        planets[rand].showDescription = 0
      });

      // hovering over a story in the menu brings you to it in space
      planets[rand].menuPlanet.addEventListener('mouseenter', () => {
        targetZoom = planets[rand].z - 150000;
        slider.value = map(targetZoom, 0, spaceDimensions.z, 1, 100)
      });
    }
  
    rectMode(CENTER); // Draw the rectangle from its center
}
let isAnyPlanetHovered = false;

function draw() {
    isAnyPlanetHovered = 0;
    cameraCoords.z = lerp(cameraCoords.z, targetZoom, 0.1);
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
    targetZoom = map(this.value, 1, 100, 0, spaceDimensions.z-visibleDist)
}



// control space with scroll
document.addEventListener("DOMContentLoaded", function() {
  window.scrollTo(0, 0);
});


window.addEventListener("scroll", function() {
  // Assuming the height of your div is 200vh
  const divHeight = window.innerHeight;
  const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPosition = window.scrollY;
  const scrollPercentage = Math.min(Math.max((scrollPosition / divHeight) * 100, 1), 100);
  targetZoom = map(scrollPercentage, 1, 100, 0, spaceDimensions.z-visibleDist);
  slider.value = scrollPercentage;
});

