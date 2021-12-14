var ship;
var asteroid = [];
var lasers = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for(var i = 0; i < 5; i++)
        asteroid.push(new Asteroid());
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

    for(var i = lasers.length - 1; i >= 0; i--){
        lasers[i].render();
        lasers[i].update(); 
        if(lasers[i].offscreen()){
            lasers.splice(i, 1);
        }
        else{
            for(var j = asteroid.length - 1; j >= 0; j--){
    
                if(lasers[i].hits(asteroid[j])){
    
                    if(asteroid[j].r > 20){
                        var newAsteroids = asteroid[j].breakup();
                        asteroid = asteroid.concat(newAsteroids);
                    }
                    asteroid.splice(j, 1);
                    lasers.splice(i, 1);
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
        lasers.push(new Laser(ship.pos, ship.heading));
    }
    if(keyCode == RIGHT_ARROW){
        ship.setRotation(0.1);
    }
    else if(keyCode == LEFT_ARROW){
        ship.setRotation(-0.1);
    }
    else if(keyCode == UP_ARROW){
        ship.boosting(true);
    }
}