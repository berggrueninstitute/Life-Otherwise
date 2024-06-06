

function Planet(depth, numPlanets, earth=false) {
    this.x = random(-spaceDimensions.x*10, spaceDimensions.x*10);
    this.y = random(-spaceDimensions.y*10, spaceDimensions.y*10);
    this.z = map(depth, numPlanets, 0, 0, spaceDimensions.z);
    this.pz = this.z;
    this.mark;
    this.markOffset;
    this.menuPlanet;
    this.description;
    this.showDescription;
    this.r;
    this.links = [];
    this.earth = earth

    if(earth) {
        this.x = 300
        this.y = -140
    }
  
    // this.update = function() {
    //   this.z = this.z - speed;
    //   if (this.z < 1) {
    //     this.z = width;
    //     this.x = random(-width, width);
    //     this.y = random(-height, height);
    //     this.pz = this.z;
    //   }
    // }
  
    this.show = function() {
    fill('#E6FFFF')
    let dist = this.z - cameraCoords.z;

        if (this.z > cameraCoords.z && dist < visibleDist ) {
            var sx = map(this.x / dist, 0, 1, 0, spaceDimensions.x);
            var sy = map(this.y / dist, 0, 1, 0, spaceDimensions.y);
            this.r = map(dist, 0, visibleDist, 100, 4);
            if (this.mark) {
                this.mark.style.display = "block"
                this.mark.style.left = sx+width/2+this.markOffset[0]*this.r + "px";
                this.mark.style.top = sy+height/2+this.markOffset[1]*this.r + "px";
                this.description.style.left = sx+width/2+this.markOffset[0]*this.r +14 + "px";
                this.description.style.top = sy+height/2+this.markOffset[1]*this.r -11 + "px";
                if (this.showDescription) {
                    this.description.style.display = "block";
                }
            }
            // if (isMouseOverDiamond(sx + width / 2, sy + height / 2, this.r) && !this.mark) {
            //     randomPlanetDescription.style.display = "block";
            //     // randomPlanetDescription.innerHTML = random(aiDescriptions)
            //     isAnyPlanetHovered +=1;
            //     fill("#E7D5FF");
            //     if (sx+width/2 > width-randomPlanetDescription.clientWidth-10) {
            //         randomPlanetDescription.style.left = "auto"
            //         randomPlanetDescription.style.right = width - (sx+width/2) + this.r*.8+5 + "px";
            //     } else {
            //         randomPlanetDescription.style.left = sx+width/2+this.r*.8+5 + "px";
            //         randomPlanetDescription.style.right = "auto"
            //     }
            //     if (sy+height/2 > height-randomPlanetDescription.clientHeight-10) {
            //         randomPlanetDescription.style.top = "auto";
            //         randomPlanetDescription.style.bottom = 5 +"px";
            //     } else {
            //         randomPlanetDescription.style.top = sy+height/2 + "px";
            //         randomPlanetDescription.style.bottom = "auto";

            //     }
            // }
            drawDiamond(sx, sy, this.r, this.earth);

        } else {
            if (this.mark) {
                this.mark.style.display = "none"
                this.description.style.display = "none";}
        }
    }
}



function drawDiamond(x, y, size, earth) {
    let diamondSize = size * sqrt(2); // Increase size to match the area of the square
    fill("#E6FFFF")

    if(earth) {
        diamondSize*=4;
    }
    // Calculate the diamond's four corner points
    let top = createVector(x, y - diamondSize / 2);
    let right = createVector(x + diamondSize / 2, y);
    let bottom = createVector(x, y + diamondSize / 2);
    let left = createVector(x - diamondSize / 2, y);

    // Draw the diamond
    beginShape();
    vertex(top.x, top.y);
    vertex(right.x, right.y);
    vertex(bottom.x, bottom.y);
    vertex(left.x, left.y);
    endShape(CLOSE);


}


function isMouseOverDiamond(x, y, size) {
    if (Math.abs(targetZoom - cameraCoords.z) <= 500) { // prevent descriptions from showing while 'traveling'
        let diamondSize = size * sqrt(2);
        return mouseX > x - diamondSize / 2 && mouseX < x + diamondSize / 2 &&
            mouseY > y - diamondSize / 2 && mouseY < y + diamondSize / 2;
    }
}