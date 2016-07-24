var App = {
};

requirejs(["time", "world", "camera"], function (Time, World, Camera) {
    App.world = new World();

    window.requestAnimationFrame((timestamp) => {
        console.log(timestamp);
        App.world.draw(document.getElementById("screen").getContext("2d"));
    });
});
