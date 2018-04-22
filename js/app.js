// Enemies player must avoid
var Enemy = function (x, y, speed) {

    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 101;
    this.height = 171;

    // The image/sprite for our enemies,
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x = this.x + this.speed * dt;

    // Keep enemies going on and on
    if (this.x > 600) {
        this.x = -100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
const Player = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.height = 171;
    this.levelCount = 1; // initial player level
    this.sprite = sprite;
    this.deads = 3; // initial lives
};
// Detecting collision 
Player.prototype.update = function (arr) {

    // Loop over enemies to find collison
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].x + arr[i].width >= player.x + 30 && arr[i].x + arr[i].width <= player.x + 120 && arr[i].y === player.y) {
            this.dead();
        }
    }

    // Level up for reaching top of the canvas
    if (this.y <= 0 && this.levelCount < 10) {
        this.levelUp();
        this.reset();
    } else if (this.levelCount === 10) {
        popUpWin();
        this.deads = 0;
    }
}
// method reducing lives after collison
Player.prototype.dead = function () {
    this.deads--;
    let lifes = document.getElementById('life');

    if (this.deads === 2) {
        lifes.innerHTML = "Lifes: <img class='heart' src='images/HeartSmall.png'><img class='heart' src='images/HeartSmall.png'>";
        this.reset();
    } else if (this.deads === 1) {
        lifes.innerHTML = "Lifes: <img class='heart' src='images/HeartSmall.png'>";
        this.reset();
    } else if (this.deads === 0) {
        lifes.innerHTML = "";
        popUpLost();
        this.levelCount = 10;
    }
}

// resets player position after collison
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 320;
}

// leveling up hardness of the game each time player touch the top  
Player.prototype.levelUp = function () {

    // update score panel
    const level = document.getElementById('level');
    this.levelCount += 1;
    level.innerHTML = this.levelCount;

    //update hardness - bugs speed
    if (this.levelCount >= 3 && this.levelCount < 7) {
        enemy1.speed += 20;
        enemy2.speed += 30;
        enemy3.speed -= 20;
        enemy4.speed += 10;
        enemy5.speed += 10;
        enemy6.speed -= 10;
    } else if (this.levelCount >= 7) {
        enemy1.speed += 10;
        enemy2.speed += 70;
        enemy3.speed -= 20;
        enemy4.speed += 30;
        enemy5.speed -= 30;
        enemy6.speed += 50;
        enemy7.speed += 20;
        enemy8.speed += 50;
        enemy9.speed += 10;
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (e) {

    if (window.event) {
        e = window.event;
    }

    const keyPressed = e.keyCode;

    if (keyPressed === 37 && this.x > 1) {
        this.x -= 100;
    } else if (keyPressed === 38 && this.y > 5) {
        this.y -= 83;
    } else if (keyPressed === 39 && this.x < 400) {
        this.x += 100;
    } else if (keyPressed === 40 && this.y < 321) {
        this.y += 83;
    }
}

// Now instantiate your objects.
const enemy1 = new Enemy(-200, 71, 100);
const enemy2 = new Enemy(-500, 71, 150);
const enemy3 = new Enemy(-200, 154, 210);
const enemy4 = new Enemy(-100, 154, 180);
const enemy5 = new Enemy(-600, 237, 170);
const enemy6 = new Enemy(-100, 237, 120);
const enemy7 = new Enemy(-100, 71, 0);
const enemy8 = new Enemy(-100, 154, 0);
const enemy9 = new Enemy(-100, 237, 0);

// Place the player object in a variable called player
const player = new Player(200, 320, 'images/char-cat-girl.png');

// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9];

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*  pop up functions + variables  */

// function to shows message after loose all lives
function popUpLost() {
    const btn1 = document.getElementById('btn1');
    const lost = document.getElementById('message-lost');
    const lvlMsg = document.getElementById('lvlMsg');

    lost.classList.remove('visible');
    lvlMsg.innerText = player.levelCount;
    btn1.addEventListener('click', pageReload);
}

// function shows winner message
function popUpWin() {
    const btn2 = document.getElementById('btn2');
    const win = document.getElementById('message-win');
    win.classList.remove('visible');
    btn2.addEventListener('click', pageReload);
}

// refresh page
function pageReload() {
    window.location.reload();
}