

function Planet() {
    this.x = random(-spaceDimensions.x*10, spaceDimensions.x*10);
    this.y = random(-spaceDimensions.y*10, spaceDimensions.y*10);
    this.z = random(spaceDimensions.z);
    this.pz = this.z;
  
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
    //   fill(255);
    //   noStroke();
    let dist = this.z - cameraCoords.z;

        if (this.z > cameraCoords.z && dist < visibleDist ) {
        // if (this.z > cameraCoords.z) {

            var sx = map(this.x / dist, 0, 1, 0, spaceDimensions.x);
            var sy = map(this.y / dist, 0, 1, 0, spaceDimensions.y);
        
            var r = map(dist, 0, visibleDist, 120, 4);
            
            square(sx, sy, r);
        }
    }
  }