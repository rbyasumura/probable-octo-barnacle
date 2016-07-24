var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

class Animal {
    constructor() {
        this.x = 10;
        this.y = 10;
        this.directionX = 1;
        this.directionY = 1;
        this.clock = setInterval(() => {
            this.pulse();
        }, 10);
    }

    pulse() {
        if (Time.state === "stopped") {
            clearInterval(this.clock);
            return;
        }

        console.log("pulse");
        this.move();
    }
    move() {
        if (0 > this.x + this.directionX || this.x + this.directionX > World.width) {
            this.directionX *= -1;
        }
        if (0 > this.y + this.directionY || this.y + this.directionY > World.height) {
            this.directionY *= -1;
        }
        this.x = this.x + this.directionX;
        this.y = this.y + this.directionY;
    }
    draw(timestamp) {
        console.log("drawing animal");
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    }
};

/// Singleton -- Only 1 time
Time = {
    state: "stopped",
    raf: null,

    play: function play() {
        this.state = "playing";
        this.raf = window.requestAnimationFrame((timestamp) => {
            World.draw(timestamp)
        });
    },
    stop: function stop() {
        this.state = "stopped";
        window.cancelAnimationFrame(this.raf);
    },
};

/// Singleton -- Only 1 world
World = {
    animal: null,
    raf: null,
    canvas: null,
    width: null,
    height: null,

    init: function init(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.animal = new Animal();
    },
    draw: function draw(timestamp) {
        console.log("drawing world: " + timestamp);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
        this.animal.draw(timestamp);
        this.requestAnimationFrame();
    },
    zoomIn: function zoomIn() {

    },
};

World.init(c);
