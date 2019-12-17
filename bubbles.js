// i.width=1366; i.height=657; (innerWidth or height is the browser's viewport, the area that the webpage appears on)   
var canvas = document.querySelector('canvas');
var canvasContext = canvas.getContext('2d');
// created a variable that specifies the area where the Balls would contain, the variable would later be used  
// in our update method
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(max,min) {
    var num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
}
// we created an object Ball
function Ball(x,y,velX,velY,color,size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}
// created a function for drawing the Ball instances
Ball.prototype.draw = function() {
    canvasContext.beginPath();
    canvasContext.fillStyle = this.color;
    canvasContext.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    canvasContext.fill();
}
// created a function for updating the movement of the Ball instances
Ball.prototype.update = function() {
    if((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
    if((this.x-this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
}
Ball.prototype.collisionDetect = function() {
    for(var b = 0; b < balls.length; b++) {
        // the line below is used to show that if this ball running this method is different from the ball it
        // is being compared to, then use the code becos we dont want the this to compare itself.
        if(!(this === balls[b])) {
            var dx = this.x - balls[b].x;
            var dy = this.y - balls[b].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            // we cannot compare this.x === ball[b].x bcos in inclusion of the size their cordinates can never be
            // the same.
            if(distance < this.size + balls[b].size) {
                balls[b].color = this.color = 'rgb(' + random(0,225) + ',' + random(0,225) + ',' + random(0,225) + ')';
            }  
        }
    }
}

var balls = [];
function loop() {
    canvasContext.fillStyle = 'rgba(0,0,0,0.25)';
    canvasContext.fillRect(0,0,width,height);
    while(balls.length < 20) {
        var size = random(10,20);
        var ball = new Ball(
            random(0+size, width-size),
            random(0+size, height-size),
            random(-2,2),
            random(-2,2),
            'rgb(' + random(0,225) + ',' + random(0,225) + ',' + random(0,225) + ')',
            size
        );
        balls.push(ball);
    }
    for(var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    // the function of this requestAnimationFrame is to make the movement dynamic or to enable animated display
    requestAnimationFrame(loop);
}
loop();



// var testBall = new Ball(50, 100, 4, 4, 'blue', 10);
// function showing() {
//     document.getElementById('daddy').innerHTML = window.innerHeight;
// }
