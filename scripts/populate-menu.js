const menu = document.getElementById("planets-menu")

console.log("hi")
for (let i = 0; i < articlePaths.length; i++) {
    let menuLink = document.createElement("a");
    menuLink.href = articlePaths[i];
    let menuPlanet = document.createElement("div");
    menuPlanet.classList.add('menuPlanetMarker')
    menuLink.appendChild(menuPlanet)
    menu.appendChild(menuLink);
}


document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll("a");
    var currentUrl = window.location.href;

    links.forEach(function(link) {
        if (link.href === currentUrl) {
            let div = link.querySelector("div")
            div.style.background = "#87FB4D";
        }
    });
});