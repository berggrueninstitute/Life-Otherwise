// this script populates the menu on all pages that arent the homepage

let menuArray = [];


const menu = document.getElementById("planets-menu")

for (let i = 0; i < articlePaths.length; i++) {
    let menuLink = document.createElement("a");
    menuLink.href = articlePaths[i][0];
    
    let menuPlanet = document.createElement("div");
    menuPlanet.classList.add('menuPlanetMarker')
    menuLink.appendChild(menuPlanet);

    let titleDiv = document.createElement("div");
    titleDiv.classList.add('planetDescription');
    titleDiv.innerHTML = articlePaths[i][1]+"<br> —"+articlePaths[i][2]; // Assuming this is the title
    titleDiv.style.display = 'none';
    menuLink.appendChild(titleDiv);

    menuLink.addEventListener('mouseover', function() {
        titleDiv.style.display = 'block';
    });
    menuLink.addEventListener('mouseout', function() {
        titleDiv.style.display = 'none';
    });

    menu.appendChild(menuLink);
    menuArray.push(menuLink);
    // titleDiv.style.top = menuLink.getBoundingClientRect().top +"px"
    // titleDiv.style.left = menuLink.getBoundingClientRect().left+25 +"px"
}

// loop again to position planet titles
for (let i = 0; i < articlePaths.length; i++) {
    menuArray[i].querySelector('.planetDescription').style.top = menuArray[i].querySelector('.menuPlanetMarker').getBoundingClientRect().top +"px"
    // console.log(menuArray[i].querySelector('.planetDescription'))
    menuArray[i].querySelector('.planetDescription').style.left = menuArray[i].querySelector('.menuPlanetMarker').getBoundingClientRect().left+25 +"px"
}

document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll("a");
    var currentUrl = window.location.href;

    links.forEach(function(link) {
        if (link.href === currentUrl) {
            let div = link.querySelector("div.menuPlanetMarker")
            div.style.background = "#87FB4D";
        }
    });
});