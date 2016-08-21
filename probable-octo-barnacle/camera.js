function camera(canvas) {
    this.mouse = {
        x: 0,
        y: 0,
        isDown: false,
    }
    this.transform = {
        scale: 1,
        dx: 0,
        dy: 0,
    }

    this.adjustPan = function () {
        this.transform.dx = Math.max(canvas.width * (1 - this.transform.scale), Math.min(this.transform.dx, 0));
        this.transform.dy = Math.max(canvas.height * (1 - this.transform.scale), Math.min(this.transform.dy, 0));
    }
    this.getDX = function () {
        if (this.focus) {
            this.transform.dx = (canvas.width / 2) - this.focus.x * this.transform.scale;
            this.adjustPan();
        }
        return this.transform.dx;
    }
    this.getDY = function () {
        if (this.focus) {
            this.transform.dy = (canvas.height / 2) - this.focus.y * this.transform.scale;
            this.adjustPan();
        }
        return this.transform.dy;
    }
    this.calculateX = function (x) {
        return (x - this.transform.dx) / this.transform.scale
    }
    this.calculateY = function (y) {
        return (y - this.transform.dy) / this.transform.scale
    }

    document.addEventListener("mousewheel", (e) => {
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        this.transform._scale = this.transform.scale + delta / 10;
        this.transform._scale = Math.max(1, this.transform._scale);

        this.transform.dx -= e.offsetX;
        this.transform.dx *= this.transform._scale / this.transform.scale;
        this.transform.dx += e.offsetX;
        this.transform.dy -= e.offsetY;
        this.transform.dy *= this.transform._scale / this.transform.scale;
        this.transform.dy += e.offsetY;

        this.transform.scale = this.transform._scale;

        this.adjustPan();
    }, false);
    canvas.addEventListener("mousedown", (e) => {
        this.mouse.isDown = true;
        this.mouse.x = e.x;
        this.mouse.y = e.y;
        this.transform._dx = this.transform.dx;
        this.transform._dy = this.transform.dy;
    }, false);
    document.addEventListener("mousemove", (e) => {
        if (this.mouse.isDown) {
            this.transform.dx = this.transform._dx + (e.x - this.mouse.x);
            this.transform.dy = this.transform._dy + (e.y - this.mouse.y);
            this.adjustPan();
        }
    }, false);
    document.addEventListener("mouseup", (e) => {
        this.mouse.isDown = false;

        var CLICK_THRESHOLD = 10;

        if (e.x - this.mouse.x <= CLICK_THRESHOLD && e.y - this.mouse.y <= CLICK_THRESHOLD) {
            var x = this.calculateX(e.offsetX);
            var y = this.calculateY(e.offsetY);
            var i = animals.findIndex(function (element, index, array) {
                return x - 5 <= element.x && element.x <= x + 5
                    && y - 5 <= element.y && element.y <= y + 5;
            }, this);
            if (i > -1) {
                this.focus = animals[i];
            }
            else {
                this.focus = null;
            }
        }
        else {
            this.focus = null;
        }
    }, false);
}
