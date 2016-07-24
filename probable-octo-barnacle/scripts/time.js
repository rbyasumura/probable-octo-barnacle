define([], function () {
    return class Time {
        constructor() {
            this.state = "stopped";
        }

        play() {
            this.state = "playing";
            window.requestAnimationFrame((timestamp) => {
                console.log(timestamp);
            });
        }
    };
});
