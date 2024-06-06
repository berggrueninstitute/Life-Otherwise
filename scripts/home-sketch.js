
var planets = [];
var numPlanets = 6000
var numStories = 16;
var domElements = document.getElementById("domElements")
// var randomPlanetDescription = document.getElementById("randomPlanetDescription")
var menu = document.getElementById("planets-menu")
var mouseOverDiamond = 0
var links;
let spaceOpacity = 0

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
    // z: 0
    z: spaceDimensions.z - 250000
};
let targetZoom = cameraCoords.z;

let scrollPause = 600;

let storyPlanets = [ // distances based on numPlanets being 6000
  {dist: 0, article: 0, earth: true},
  {dist: 0.00000000247, article: 5, earth: true},
  {dist: 0.00127, article: 1, earth: false},
  {dist: 0.00127, article: 4, earth: false},
  {dist: 0.00420, article: 2, earth: false},
  {dist: 3180, article: 3, earth: false}
]



function setup() {
    document.getElementById('menu').style.position = 'absolute'
    console.log(menu.style.position)
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('myCanvasContainer');
    angleMode(DEGREES);
    for (var i = 0; i < numPlanets; i++) {
        planets[i] = new Planet(i, numPlanets);
    }
    // create big earth
    planets.push(new Planet(180, numPlanets, true))
    // place stories on random planets
    for (let i = 0; i < storyPlanets.length; i++) {
      if (storyPlanets[i].dist > .1) {
        storyPlanets[i].dist*=10000
        storyPlanets[i].dist+=180
      }
      let rand
      if (storyPlanets[i].earth) {
        rand = 0
      } else {
        planets.push(new Planet(storyPlanets[i].dist, numPlanets))
        // let rand = Math.floor(Math.random() * planets.length-1000) + 1000;
        rand = planets.length-1
      }

      planets[rand].links.push(articlePaths[storyPlanets[i].article]);

      for (let i=0; i<planets[rand].links.length; i++) {
        let hoverContainer = document.createElement("div");
        let menuLink = document.createElement("div");
        menuLink.classList.add("menuLink")
        // planets[rand].menuPlanet = document.createElement("div");
        planets[rand].menuPlanet = menuLink;
        planets[rand].menuPlanet.classList.add('linked', "object"+i)
        let menuPlanetDot = document.createElement("div");
        menuPlanetDot.classList.add("menuPlanetDot")
        planets[rand].menuPlanetDot = menuPlanetDot;
        menuLink.appendChild(menuPlanetDot)
        // menuLink.appendChild(planets[rand].menuPlanet)
        let linkText = document.createTextNode(planets[rand].links[i][1]);
        menuLink.appendChild(linkText)
        menuLink.href = articlePaths[i][0];
        menu.appendChild(menuLink);
        planets[rand].description = document.createElement("div");
        planets[rand].description.innerHTML = planets[rand].links[i][3]+"<br>"+planets[rand].links[i][4]+"<br>"+planets[rand].links[i][5]
        domElements.appendChild(hoverContainer);
        planets[rand].mark = document.createElement("div");
        planets[rand].mark.classList.add('linked',"object"+i);
        let x,y
        if (width < 600) {
          x = random()*spaceDimensions.x*1 - spaceDimensions.x*.5
          y = random()*spaceDimensions.y*2 - spaceDimensions.y*1
        } else {
          x = random()*spaceDimensions.x*2 - spaceDimensions.x*1
          y = random()*spaceDimensions.y*2 - spaceDimensions.y*1
        }
        planets[rand].x = x
        planets[rand].y = y
        planets[rand].mark.classList.add("planetMarker");
        planets[rand].description.classList.add("planetDescription")
        hoverContainer.appendChild(planets[rand].mark);
        hoverContainer.appendChild(planets[rand].description);
        planets[rand].markOffset = [random()-.5, random()-.5];
      }



      function isMobileLayout() {
        return window.innerWidth < 600; // Example breakpoint for mobile layout
      }

    
      
      let tappedOnce = false;
  
      if (isMobileLayout()) {
          // Mobile layout logic
          planets[rand].mark.addEventListener('touchstart', function(event) {
            if (!tappedOnce) {
                // First tap
                event.preventDefault();
                planets[rand].menuPlanetDot.classList.add("hovered")
                planets[rand].mark.classList.add("hovered")
                planets[rand].description.style.display = "block"
                planets[rand].showDescription = 1
                tappedOnce = true;
                console.log("1st click", tappedOnce)
            } else {
                // Second tap
                console.log("2nd click", tappedOnce)
                window.location.href = articlePaths[i][0];
            }
          });

          planets[rand].menuPlanet.addEventListener('touchstart', function(event) {
              if (!tappedOnce) {
                  // First tap
                  event.preventDefault();
                  planets[rand].menuPlanetDot.classList.add("hovered")
                  planets[rand].mark.classList.add("hovered")
                  planets[rand].description.style.display = "block"
                  planets[rand].showDescription = 1
                  tappedOnce = true;
                  targetZoom = planets[rand].z - 150000;
                  slider.value = map(targetZoom, 0, spaceDimensions.z, 1, 100)
                  window.scrollTo(0, map(targetZoom, 0, spaceDimensions.z, window.innerHeight, document.documentElement.scrollHeight));
                  console.log("1st click", tappedOnce)
              } else {
                  // Second tap
                  console.log("2nd click", tappedOnce)
                  window.location.href = articlePaths[i][0];
              }
          });
          document.addEventListener('touchstart', function(event) {
              if (!planets[rand].menuPlanet.contains(event.target)&& !planets[rand].mark.contains(event.target) && tappedOnce) {
                  planets[rand].menuPlanetDot.classList.remove("hovered")
                  planets[rand].mark.classList.remove("hovered")
                  planets[rand].description.style.display = "none"
                  planets[rand].showDescription = 0
                  tappedOnce = false;
              }
          });
      } else {
        planets[rand].mark.addEventListener('mouseover', () => {
          planets[rand].menuPlanetDot.classList.add("hovered")
          planets[rand].mark.classList.add("hovered")
          // planets[rand].description.style.display = "block"
          planets[rand].showDescription = 1
        });

        planets[rand].mark.addEventListener('click', () => {
          window.location.href = articlePaths[i][0];
        });
  
        planets[rand].mark.addEventListener('mouseout', () => {
          planets[rand].menuPlanetDot.classList.remove("hovered")
          planets[rand].mark.classList.remove("hovered")
          planets[rand].description.style.display = "none"
          planets[rand].showDescription = 0
        });
  
        planets[rand].menuPlanet.addEventListener('mouseover', () => {
          planets[rand].menuPlanetDot.classList.add("hovered")
          planets[rand].mark.classList.add("hovered")
          planets[rand].description.style.display = "block"
          planets[rand].showDescription = 1
        });

        planets[rand].menuPlanet.addEventListener('click', () => {
          window.location.href = articlePaths[i][0];
        });
      
        planets[rand].menuPlanet.addEventListener('mouseout', () => {
          planets[rand].menuPlanetDot.classList.remove("hovered")
          planets[rand].mark.classList.remove("hovered")
          planets[rand].description.style.display = "none"
          planets[rand].showDescription = 0
        });
  
        // hovering over a story in the menu brings you to it in space
        planets[rand].menuPlanet.addEventListener('mouseenter', () => {
          targetZoom = planets[rand].z - 150000;
          console.log(planets[rand].z)
          // console.log(targetZoom, map(targetZoom, -150000, spaceDimensions.z-150000, -150000, spaceDimensions.z-150000))
          slider.value = map(targetZoom, 0, spaceDimensions.z, 1, 100)
          window.scrollTo(0, map(targetZoom, -150000, spaceDimensions.z-150000, window.innerHeight, document.documentElement.scrollHeight));

        });
      }

      
      function openDescription() {
          // Logic to open the description
      }
      
      function closeDescription() {
          // Logic to close the description
      }

      
  
    }
  
    rectMode(CENTER); // Draw the rectangle from its center
}
let isAnyPlanetHovered = false;

function draw() {
    isAnyPlanetHovered = 0;
    cameraCoords.z = lerp(cameraCoords.z, targetZoom, 0.1);
    background('#E6FFFF')
    // background("#0000E9")
    fill(0,0,233)
    stroke(0,0,233,spaceOpacity) //'#0000E9'
    // stroke(0,0,233,spaceOpacity)


    translate(width / 2, height / 2);
    // rotate(45); // Rotate by 45 degrees
    for (var i = 0; i < planets.length; i++) {
      planets[i].show();
    }
    if (!isAnyPlanetHovered) {
      // document.getElementById("randomPlanetDescription").style.display = "none";
    }

    if (window.scrollY > window.innerHeight-20) {
      spaceOpacity  = min(spaceOpacity + 15, 255)
    } else {
      spaceOpacity  = max(spaceOpacity -15, 0)
    }
    if (spaceOpacity >=250) {
      hidden = false
    } else {
      hidden = true 
    }
}




// window.addEventListener('scroll', () => {
//     cameraCoords.z = map(window.scrollY, 0, height, 0, spaceDimensions.z*.8)
//   });


const slider = document.getElementById('mySlider');

slider.oninput = function() {
  // Invert the zoom direction
  targetZoom = map(this.value, 1, 100, spaceDimensions.z - visibleDist, 0);
  window.scrollTo(0, map(this.value, 1, 100, window.innerHeight, document.documentElement.scrollHeight));
  console.log(map(this.value, 1, 100, window.innerHeight, document.documentElement.scrollHeight));
}



// control space with scroll
document.addEventListener("DOMContentLoaded", function() {
  window.scrollTo(0, 0);
});






// document.getElementById('menu').style.opacity = 0;
// let fadeElements = document.querySelectorAll('#menu, #spaceControls'); // Select both elements
// fadeElements.forEach(el => {
//   el.style.opacity = 0;
// });









const scrollContainer = document.getElementById('scrollContainer');
let prevScroll = 0
let isScrolling = false;

document.addEventListener('scroll', () => {
  const div = document.getElementById('scrollContainer');

  const windowHeight = window.innerHeight;
  const divTop = div.offsetTop;
  const divHeight = div.offsetHeight;

  // Get the current scroll position of the window
  const scrollPosition = window.scrollY;

  // Calculate when the top of the div aligns with the top of the window
  const divTopVisible = scrollPosition - divTop;

  // Calculate when the bottom of the div aligns with the bottom of the window
  const divBottomVisible = (scrollPosition + windowHeight) - (divTop + divHeight);

  scrollProgress = window.scrollY - div.offsetTop - scrollPause;
  lowestScrollValue = div.clientHeight - window.innerHeight - scrollPause;
  scrollPercentage = Math.max(0, (scrollProgress / lowestScrollValue) * 100);

  // Invert the zoom direction
  targetZoom = map(scrollPercentage, 1, 100, spaceDimensions.z - visibleDist, 0);
  slider.value = scrollPercentage;


  // --- space opacity
  // let fadeElements = document.querySelectorAll('#menu, #spaceControls, #domElements');
  let fadeElements = document.querySelectorAll('#domElements');
  const targetScrollY = window.innerHeight -200; // Scroll position at which elements should be visible
  const isVisible = window.scrollY >= targetScrollY;

  // Apply styles based on visibility
  fadeElements.forEach(el => {
    if (isVisible) {
      el.style.display = 'block'; // Show the element
      setTimeout(() => el.style.opacity = 1, 10);
      // el.style.opacity = 1 // Delay opacity to ensure display is processed
    } else {
      el.style.opacity = 0; // Hide the element
      // Use a timeout to delay setting display none until after the opacity transition
      setTimeout(() => el.style.display = 'none', 500); // Match transition time
    }
  });

  // --- scroll jump for hero
  // const hero = document.getElementById('home-hero');
  // const heroHeight = hero.offsetHeight;

  // if (scrollPosition < heroHeight && scrollPosition > prevScroll && !isScrolling) {
  //   isScrolling = true;
  //     window.scrollTo({
  //         top: heroHeight,
  //         behavior: 'smooth'
  //     });
  //     console.log("detected")
  //     setTimeout(() => {
  //       isScrolling = false;
  //     }, 800);
  // }
  // else if (scrollPosition < heroHeight && !isScrolling) {
  //   isScrolling = true;
  //     window.scrollTo({
  //         top: 0,
  //         behavior: 'smooth'
  //     });
  //     setTimeout(() => {
  //       isScrolling = false;
  //     }, 800);
  // }
  // prevScroll = scrollY


  // // --- prevent from scrolling into hero/intro unless youre fully zoomed out
  // const conditionMet = (cameraCoords.z <= 0);
  // const heroBtm = hero.getBoundingClientRect().height;
  // // console.log(heroBtm)
  // if (window.scrollY < heroBtm && !conditionMet) {
  //   window.scrollTo({
  //     top: heroBtm,
  //     // behavior: 'smooth'
  //   });
  // }
});



// this also exists in populate-menu.js

let mobileMenu = document.getElementById("mobile-menu")

function populateMobileMenu() {
  for (let i = 0; i < articlePaths.length; i++) {
      let menuLink = document.createElement("a");
      menuLink.href = articlePaths[i][0];
      menuLink.classList.add("menuLink")
      
      let menuPlanetDot = document.createElement("div");
      menuPlanetDot.classList.add("menuPlanetDot")
      menuLink.appendChild(menuPlanetDot);

      let linkText = document.createTextNode(articlePaths[i][1]);
      menuLink.appendChild(linkText)

      mobileMenu.appendChild(menuLink);
  }
}
populateMobileMenu()  



document.body.appendChild(mobileMenu)