
const mainPage = document.documentElement; // Main page scroll
let cloudImages = document.querySelectorAll(".cloud-image")
let cloudHolder = document.getElementById("cloud-holder");


if (window.innerWidth > 600) {
    for (i=0; i<cloudImages.length; i++) {
        cloudHolder.appendChild(cloudImages[i])
        cloudImages[i].style.position = "absolute"
        cloudImages[i].style.left = Math.random()*33 + "vw"
        cloudImages[i].style.top = 40*i + "lvh"
    }
    let emptyDiv = document.createElement('div');
    emptyDiv.style.position = 'absolute';
    emptyDiv.style.height = '50vh';
    emptyDiv.style.width = '100%'; // To ensure it spans the full width
    emptyDiv.style.top = (40 * cloudImages.length) + "vh"; // Positioning it at the bottom of the last image
    cloudHolder.appendChild(emptyDiv);
}

// Sync main page scroll with div scroll
document.addEventListener('scroll', () => {
    const percentScrolled = calculateScrollPercentage(mainPage);
    console.log(percentScrolled, mainPage.scrollTop, cloudHolder.scrollTop)
    cloudHolder.scrollTop = (cloudHolder.scrollHeight - cloudHolder.clientHeight) * (percentScrolled / 100);
});

// Function to calculate scroll percentage
function calculateScrollPercentage(element) {
    return (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
}