define(["require", "exports", "underscore", "./lib", "./player", "./world"], function (require, exports, _, Library, Player, World) {
    "use strict";
    var GameServer = (function () {
        function GameServer() {
            this.games = [];
        }
        GameServer.prototype.connection = function (socket) {
            var obj = this;
            var game;
            if (obj.games.length === 0) {
                game = new GameData();
                this.games.push(game);
            }
            else {
                game = obj.games[0];
            }
            if (game.players.length < 2) {
                socket.on('playerReady', function () {
                    game.addPlayer(socket);
                });
                socket.emit('gameReady', game);
            }
        };
        return GameServer;
    }());
    exports.GameServer = GameServer;
    var GameData = (function () {
        function GameData() {
            this.id = Library.guid();
            this.players = [];
            this.map = new World.World(25, 25, 100, 2).map;
        }
        GameData.prototype.toLight = function (player) {
            return new GameDataLight(this, player);
        };
        GameData.prototype.addPlayer = function (socket) {
            console.log('GameData.addplayer');
            var obj = this;
            var team = obj.players.length;
            obj.createClones(team);
            var player = new Player.Player(team, true);
            obj.players.push(player);
            World.Map.addSprite(obj.map, player);
            obj.subscribePlayer(socket, player);
        };
        GameData.prototype.createClones = function (team) {
            console.log('GameData.createClones');
            for (var i = 0; i < 200; i++) {
                var player = new Player.Player(team, false);
                this.players.push(player);
                World.Map.addSprite(this.map, player);
            }
        };
        GameData.prototype.startGame = function () {
            console.log('GameData.startGame');
            var obj = this;
            for (var p in this.players) {
                obj.players[p].canMove = true;
                obj.players[p].canAct = true;
            }
            // set an interval to process each player's latest update
            setInterval(function () {
                for (var p in obj.players) {
                    obj.players[p].processAction(obj);
                }
            }, 25);
        };
        GameData.prototype.subscribePlayer = function (socket, player) {
            console.log('GameData.subscribePlayer');
            var obj = this;
            // register player's socket to accept controller updates from client
            player.registerControlsUpdates(socket);
            socket.on('updateMe', function () {
                socket.emit('gameUpdate', obj.toLight(player));
            });
            socket.emit('subscribed');
            obj.startGame();
        };
        return GameData;
    }());
    exports.GameData = GameData;
    var GameDataLight = (function () {
        function GameDataLight(gameData, player) {
            this.players = gameData.players;
            this.byps = gameData.map.byps;
            this.bxps = gameData.map.bxps;
            this.pyps = gameData.map.pyps;
            this.pxps = gameData.map.pxps;
            this.playerX = player.sprite.x;
            this.playerY = player.sprite.y;
            var sectionId = World.Map.getSectionId(gameData.map, player.sprite.x, player.sprite.y, 'p');
            // clone map objects list and add in players
            var sprites = _.map(gameData.map.players, function (p) { return p.sprite; });
            var mapObjects = gameData.map.objects.concat(sprites);
            // only draw objects that are around current player's section
            var acceptSections = World.Map.getSurroundingSections(gameData.map, sectionId);
            this.drawObjects = _.filter(mapObjects, function (o) {
                return acceptSections.indexOf(o.sectionId) > -1;
            });
        }
        return GameDataLight;
    }());
    exports.GameDataLight = GameDataLight;
});
