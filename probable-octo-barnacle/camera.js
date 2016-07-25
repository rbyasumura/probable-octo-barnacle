var mouse = {
    x: 0,
    y: 0,
    isDown: false,
}
var transform = {
    scale: 1,
    dx: 0,
    dy: 0,
}
function adjustPan() {
    transform.dx = Math.max(canvas.width * (1 - transform.scale), Math.min(transform.dx, 0));
    transform.dy = Math.max(canvas.height * (1 - transform.scale), Math.min(transform.dy, 0));
}

document.addEventListener("mousewheel", function (e) {
    var e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    transform._scale = transform.scale + delta / 10;
    transform._scale = Math.max(1, transform._scale);

    transform.dx -= e.offsetX;
    transform.dx *= transform._scale / transform.scale;
    transform.dx += e.offsetX;
    transform.dy -= e.offsetY;
    transform.dy *= transform._scale / transform.scale;
    transform.dy += e.offsetY;

    transform.scale = transform._scale;

    adjustPan();
}, false);
canvas.addEventListener("mousedown", function (e) {
    mouse.isDown = true;
    mouse.x = e.x;
    mouse.y = e.y;
    transform._dx = transform.dx;
    transform._dy = transform.dy;
}, false);
document.addEventListener("mousemove", function (e) {
    if (mouse.isDown) {
        transform.dx = transform._dx + (e.x - mouse.x);
        transform.dy = transform._dy + (e.y - mouse.y);
        adjustPan();
    }
}, false);
document.addEventListener("mouseup", function (e) {
    mouse.isDown = false;
}, false);
