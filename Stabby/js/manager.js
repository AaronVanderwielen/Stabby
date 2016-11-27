define(["require", "exports", "./controls", './render'], function (require, exports, Controls, Render) {
    "use strict";
    var Manager = (function () {
        function Manager() {
        }
        Manager.prototype.initGame = function () {
            var obj = this, canvas = $('#canvas')[0];
            obj.gameRender = new Render.GameRender(canvas, window.innerWidth, window.innerHeight);
            obj.socket = io.connect('http://localhost:1337');
            obj.socket.on('gameReady', function (gameData) {
                obj.loadAssets(gameData, function () {
                    obj.bindControls(gameData);
                    obj.socket.on('subscribed', function () {
                        obj.subscribeToUpdates();
                        obj.socket.emit('updateMe');
                    });
                    var team = prompt("Choose your team. 0 = aaron, 1 = kevin");
                    obj.socket.emit('playerReady', parseInt(team));
                });
            });
        };
        Manager.prototype.loadAssets = function (gameData, callback) {
            var obj = this;
            obj.gameRender.loadAssets(function () {
                // load files, render and cache map objects/sprites
                obj.gameRender.mapRender = new Render.MapRender(gameData.map);
                obj.gameRender.initialMapRender();
                callback();
            });
        };
        Manager.prototype.bindControls = function (gameData) {
            var obj = this, gameControls = new Controls.KeyboardControls(), interval;
            //gameControls.onConnect = function () {
            interval = setInterval(function () {
                obj.socket.emit('updatePlayerControls', gameControls);
            }, 25);
            //}
            //gameControls.onDisconnect = function () {
            //clearInterval(interval);
            //};
            //gameControls.start();
        };
        Manager.prototype.subscribeToUpdates = function () {
            var obj = this, lastGameUpdate = new Date();
            obj.socket.on('gameUpdate', function (gameData) {
                var now = new Date(), updateDuration = now.getTime() - lastGameUpdate.getTime();
                lastGameUpdate = now;
                $('#up').html("up: " + updateDuration.toString());
                var ms = obj.gameRender.refresh(gameData);
                $('#fps').html("fps: " + ms);
                obj.socket.emit('updateMe');
            });
        };
        return Manager;
    }());
    exports.Manager = Manager;
});
//# sourceMappingURL=manager.js.map