import _ = require("underscore");
import Library = require("./lib");
import Player = require("./player");
import Controls = require("./controls");
import World = require("./world");

export class GameServer {
    games: GameData[];

    constructor() {
        this.games = [];
    }

    connection(socket: SocketIO.Socket) {
        var obj = this;

        var game: GameData;
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
    }
}

export class GameData {
    id: string;
    players: Player.Player[];
    map: World.Map;

    constructor() {
        this.id = Library.guid();
        this.players = [];
        this.map = new World.World(25, 25, 100, 2).map;
    }

    toLight(player: Player.Player) {
        return new GameDataLight(this, player);
    }

    addPlayer(socket: SocketIO.Socket) {
        console.log('GameData.addplayer');
        var obj = this;

        var team: Player.Team = obj.players.length;

        obj.createClones(team);

        var player = new Player.Player(team, true);
        obj.players.push(player);
        World.Map.addSprite(obj.map, player);

        obj.subscribePlayer(socket, player)
    }

    createClones(team: Player.Team) {
        console.log('GameData.createClones');
        for (var i = 0; i < 200; i++) {
            var player = new Player.Player(team, false);
            this.players.push(player);
            World.Map.addSprite(this.map, player);
        }
    }

    startGame() {
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
    }

    subscribePlayer(socket: SocketIO.Socket, player: Player.Player) {
        console.log('GameData.subscribePlayer');
        var obj = this;

        // register player's socket to accept controller updates from client
        player.registerControlsUpdates(socket);

        socket.on('updateMe', function () {
            socket.emit('gameUpdate', obj.toLight(player));
        });

        socket.emit('subscribed');

        obj.startGame();
    }
}

export class GameDataLight {
    players: Player.Player[];
    drawObjects: World.IMapObject[];
    byps: number;
    bxps: number;
    pyps: number;
    pxps: number;
    playerX: number;
    playerY: number;

    constructor(gameData: GameData, player: Player.Player) {
        this.players = gameData.players;
        this.byps = gameData.map.byps;
        this.bxps = gameData.map.bxps;
        this.pyps = gameData.map.pyps;
        this.pxps = gameData.map.pxps;
        this.playerX = player.sprite.x;
        this.playerY = player.sprite.y;

        var sectionId = World.Map.getSectionId(gameData.map, player.sprite.x, player.sprite.y, 'p');

        // clone map objects list and add in players
        var sprites = _.map(gameData.map.players, function (p: Player.Player) { return p.sprite; });
        var mapObjects = gameData.map.objects.concat(sprites);

        // only draw objects that are around current player's section
        var acceptSections = World.Map.getSurroundingSections(gameData.map, sectionId);
        this.drawObjects = _.filter(mapObjects, function (o: World.IMapObject) {
            return acceptSections.indexOf(o.sectionId) > -1;
        });
    }
}