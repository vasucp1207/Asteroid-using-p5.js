var ship;
var asteroid = [];
var laser = [];

function setup(){

    createCanvas(windowWidth, windowHeight);
    background(0);
    ship = new Ship();

    for(var i = 0; i < 5; i++){
        asteroid.push(new Asteroid());
    }
}

function draw(){

    background(0);

    for(var i = 0; i < asteroid.length; i++){

        if(ship.hits(asteroid[i])){
            console.log('opps');
        }
        asteroid[i].render();
        asteroid[i].update();
        asteroid[i].edges();
    }

    for(var i = laser.length - 1; i >= 0; i--){
        
        laser[i].render();
        laser[i].update();
        if(laser[i].offscreen()){
            laser.splice(i, 1);
        }

        else{
            for(var j = asteroid.length - 1; j >= 0; j--){

                if(laser[i].hits(asteroid[j])){
                    // console.log('oh yeah');
                    if(asteroid.r > 20){
                        var newAsteroids = asteroid[j].breakup();
                        asteroid = asteroid.concat(newAsteroids);
                    }
                    asteroid.splice(j, 1);
                    laser.splice(i, 1);
                    break;
                }
            }
        }
    }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
}

function keyReleased(){

    ship.setRotation(0);
    ship.boosting(false);
}

function keyPressed(){

    if(key == ' '){
        laser.push(new Laser(ship.pos, ship.heading));
    }
    if(keyCode == LEFT_ARROW){
        ship.setRotation(-0.1);
    }
    else if(keyCode == RIGHT_ARROW){
        ship.setRotation(0.1);
    }
    else if(keyCode == UP_ARROW){
        ship.boosting(true);
    }
}

function Ship(){

    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.isBoosting = false;

    this.hits = function(asteroid){

        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if(d < this.r + asteroid.r){
            return true;
        }
        else{
            return false;
        }
    }

    this.render = function(){

        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(255);
        rotate(this.heading + PI / 2);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
    }

    this.turn = function(){

        this.heading += this.rotation;
    }

    this.boosting = function(b){

        this.isBoosting = b;
    }

    this.boost = function(){

        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }
    
    this.update = function(){

        if(this.isBoosting){
            this.boost();
        }

        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }

    this.setRotation = function(angle){

        this.rotation = angle;
    }

    this.edges = function(){
        if(this.pos.x > width + this.r){
            this.pos.x = -this.r;
        }
        else if(this.pos.x < -this.r){
            this.pos.x = width + this.r;
        }
        if(this.pos.y > height + this.r){
            this.pos.y = -this.r;
        }
        else if(this.pos.y < -this.r){
            this.pos.y = height + this.r;
        }
    }
}

function Asteroid(pos, r){

    if(pos){
        this.pos = pos.copy();
    }
    else{
        this.pos = createVector(random(width), random(height));
    }
    if(r){
        this.r = r * 0.5;
    }
    else{
        this.r = random(15, 50);
    }

    this.total = random(5, 15);
    this.vel = p5.Vector.random2D();
    this.offset = [];
    
    for(var i = 0; i < this.total; i++){
        this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }

    this.breakup = function(){

        var newA = []
        newA[0] = new Asteroid(this.pos, this.r);
        newA[1] = new Asteroid(this.pos, this.r);

        return newA;
    }

    this.update = function(){

        this.pos.add(this.vel);
    }

    this.render = function(){

        push();
        noFill();
        stroke(255);
        translate(this.pos.x, this.pos.y);
        // ellipse(this.pos.x, this.pos.y, 2 * this.r);

        beginShape();
        for(var i = 0; i < this.total; i++){
            var angle = map(i, 0, this.total, 0, TWO_PI);
            var x = (this.r + this.offset[i]) * cos(angle);
            var y = (this.r + this.offset[i]) * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    this.edges = function(){
        if(this.pos.x > width + this.r){
            this.pos.x = -this.r;
        }
        else if(this.pos.x < -this.r){
            this.pos.x = width + this.r;
        }
        if(this.pos.y > height + this.r){
            this.pos.y = -this.r;
        }
        else if(this.pos.y < -this.r){
            this.pos.y = height + this.r;
        }
    }
}

function Laser(spos, angle){

    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);

    this.hits = function(asteroid){

        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if(d < asteroid.r){
            return true;
        }
        else{
            return false;
        }
    }

    this.update = function(){

        this.pos.add(this.vel);
    }

    this.render = function(){

        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.offscreen = function(){
        if(this.pos.x > width){
            return true;
        }
        else if(this.pos.x < 0){
            return true;
        }
        if(this.pos.y > height){
            return true;
        }
        else if(this.pos.y < 0){
            return true;
        }
        else{
            return false;
        }
    }
}