//statics
canvas = document.getElementById('canvas');
c = canvas.getContext('2d');
canvas.style.background = "black";
c.font = "30px Arial";
var canvasObjects = [];
var canvasHeight = canvas.height;
player = "";
enemy = "";
ball = "";
var mouse = {
    x: undefined,
    y: innerHeight / 2,
    lp: innerHeight / 2
}





//events
window.addEventListener('load', function (event) {
    Main();
}, false)
window.addEventListener('keydown',
    function (event) {
        if (event.keyCode === 38) {
            //Up arrow
            console.log("Up arrow input");
            if (player.y <= 0) {
                return;
            }
            player.y -= player.speed;
            player.collider.y = player.y;

        }

        if (event.keyCode === 40) {
            //Down arrow
            console.log("Down arrow input");
            if (player.y + player.height >= canvas.height) {
                return;
            }
            player.y += player.speed;
            player.collider.y = player.y;
        }
    }, false)

window.addEventListener('mousemove', function (event) {
    // alert("mousemoveWorking");
    mouse.y = event.y;


}, false)




//functions

function Main() {
    canvas.width = innerWidth;
    canvas.height = innerHeight - 5;
    player = new Player("player", canvas.width - 40, canvas.height / 2 - 100, 20, 150);
    enemy = new Player("enemy", 0, canvas.height / 2 - 100, 20, 150);
    ball = new Ball(canvas.width / 2, canvas.height / 2, 10);

    Animate();
}
function Animate() {
    requestAnimationFrame(Animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    ball.Update();
    AI();
    for (var i = 0; i < canvasObjects.length; i++) {

        canvasObjects[i].Draw();
        //console.log(canvasObjects[i] + "Drawn");
    }


    PlayerMouseMove();

    RoundManager()
    //Debug Collider
   // c.fillRect(player.collider.x, player.collider.y, player.collider.width, player.collider.height);
  
}
Player = function (name, x, y, width, height) {
    this.name = name;
    this.score = 0;
    this.speed = 11;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.collider = new Collider(this.x, this.y, this.width, this.height);
    canvasObjects[canvasObjects.length] = this;

    this.Draw = function () {
        c.fillStyle = 'blue';
        c.fillRect(this.x, this.y, this.width, this.height);
    }


}
Ball = function (x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.dx = 7;
    this.dy = 7;

    this.collider = new Collider(this.x, this.y, this.width, this.height);
    canvasObjects[canvasObjects.length] = this;

    this.Draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        c.strokeStyle = "red";
        c.fillStyle = "green";
        c.stroke();
        c.fill();
        //c.fillRect(this.x, this.y, this.width, this.height);
    }

    this.Update = function () {
        if (player.collider.CheckCollision(this.x, this.y) || enemy.collider.CheckCollision(this.x, this.y)) {
            this.dx = -this.dx;
            console.log("X direction changed");
        }

        if (this.y + this.rad >= innerHeight || this.y - this.rad <= 0) {
            this.dy = - this.dy;
            console.log("Y direction changed");
        }
        this.x += this.dx;
        this.y += this.dy;
    }




}
Collider = function (x, y, width, height) {
    console.log("Collider created");

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.CheckCollision = function (x, y) {
        if (x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height) {
            return true;
        } else {
            return false;
        }

    }


}
function AI()
{
    if (enemy.y < ball.y) {
        enemy.y += enemy.speed;
        
    }
    if (enemy.y +enemy.height > ball.y) {
        enemy.y -= enemy.speed;
    }
    enemy.collider.y = enemy.y;
    //Dubug pro  {(>^.^<)} 
    //console.log ( "Enemy Y: " +enemy.y+"Player Y:"+player.y)
}
function PlayerMouseMove() {
    if (player.y  <= mouse.y) {

        player.y += player.speed;
    }
    if (player.y  >= mouse.y) {

        player.y -= player.speed;
    }
    player.collider.y = player.y;
    console.log(player.y + ",   " + mouse.y);
}
function RoundManager()
{
   
    c.fillText("Player:" + player.score + "  AI:" + enemy.score,
        canvas.width / 2, canvas.height / 2);

    if (ball.x<=-10) {
        player.score++;
        ball.x = canvas.width / 2;
    }
    if (ball.x >= canvas.width+10) {
        enemy.score++;
        ball.x = canvas.width / 2;
    }
}

