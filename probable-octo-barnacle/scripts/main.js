var App = {
};

requirejs(["time", "world", "camera"], function (Time, World, Camera) {
    App.world = new World();
    App.camera = new Camera(document.getElementById("screen").getContext("2d"));
    App.time = new Time();
    App.time.registerOnTick(App.camera.shoot);
});
