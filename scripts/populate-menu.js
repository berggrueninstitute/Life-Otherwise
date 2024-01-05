const menu = document.getElementById("planets-menu")

console.log("hi")
for (let i = 0; i < articlePaths.length; i++) {
    let menuPlanet = document.createElement("div");
    menuPlanet.classList.add('menuPlanetMarker')
    menu.appendChild(menuPlanet);
}