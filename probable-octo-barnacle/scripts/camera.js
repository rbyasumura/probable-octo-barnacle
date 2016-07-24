define([], function () {
    return class Camera {
        constructor(screen) {
            this.screen = screen;
            this.scale = 1;
        }

        shoot(world) {
            world.draw(this.screen);
        }
        zoomIn() {
            this.scale++;
        }
    };
});
