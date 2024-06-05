// this script populates the menu on all pages that arent the homepage

let menuArray = [];


const menu = document.getElementById("planets-menu")

let mobileMenu = document.getElementById("mobile-menu")

for (let i = 0; i < articlePaths.length; i++) {
    let menuLink = document.createElement("a");
    menuLink.href = articlePaths[i][0];
    menuLink.classList.add("menuLink")
    
    let menuPlanetDot = document.createElement("div");
    menuPlanetDot.classList.add("menuPlanetDot")
    menuLink.appendChild(menuPlanetDot);
    // let menuPlanet = document.createElement("div");
    // menuPlanet.classList.add('menuPlanetMarker')
    // menuLink.appendChild(menuPlanet);
    let linkText = document.createTextNode(articlePaths[i][1]);
    menuLink.appendChild(linkText)

    // let titleDiv = document.createElement("div");
    // titleDiv.classList.add('planetDescription');
    // titleDiv.innerHTML = articlePaths[i][1]+"<br> —"+articlePaths[i][2]; // Assuming this is the title
    // // titleDiv.style.display = 'none';
    // menuLink.appendChild(titleDiv);

    menu.appendChild(menuLink);
    // menuArray.push(menuLink);
    // titleDiv.style.top = menuLink.getBoundingClientRect().top +"px"
    // titleDiv.style.left = menuLink.getBoundingClientRect().left+25 +"px"
}

// loop again to position planet titles
// for (let i = 0; i < articlePaths.length; i++) {
//     menuArray[i].querySelector('.planetDescription').style.top = menuArray[i].querySelector('.menuPlanetMarker').getBoundingClientRect().top +"px"
//     // console.log(menuArray[i].querySelector('.planetDescription'))
//     menuArray[i].querySelector('.planetDescription').style.left = menuArray[i].querySelector('.menuPlanetMarker').getBoundingClientRect().left+25 +"px"
// }

document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll(".menuLink");
    var currentUrl = window.location.href;

    links.forEach(function(link) {
        if (link.href === currentUrl) {
            let div = link.querySelector("div.menuPlanetDot")
            div.style.background = "#87FB4D";
            div.classList.add("current")
            link.removeAttribute("href");
            link.style.cursor = "default"
        } else {
            let menuPlanetDot = link.querySelector('.menuPlanetDot');
            link.addEventListener('mouseover', function() {
                menuPlanetDot.style.background = "#87FB4D";
            });
            link.addEventListener('mouseout', function() {
                menuPlanetDot.style.background = "#DFFF00";
            });
        }
        
    });
});


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

populateMobileMenu()  // a copy exists for homepage as well