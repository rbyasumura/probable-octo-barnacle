define([], function () {
    return class World {
        constructor() {
            this.width = 640;
            this.height = 480;
        }

        draw(screen) {
            screen.lineWidth = 1;

            for (var i = 0; i < this.width; i += 10) {
                screen.moveTo(i, 0);
                screen.lineTo(i, this.height);
                screen.stroke();
            }

            for (var i = 0; i < this.height; i += 10) {
                screen.moveTo(0, i);
                screen.lineTo(this.width, i);
                screen.stroke();
            }

            screen.moveTo(0, 0);
            screen.lineTo(this.width, this.height);
            screen.stroke();
            screen.moveTo(this.width, 0);
            screen.lineTo(0, this.height);
            screen.stroke();
        }
    };
});
