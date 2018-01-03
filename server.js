var http = require('http'),
    express = require('express'),
    path = require('path'),
    socket = require("socket.io"),
    requirejs = require('requirejs');

// configure requirejs
requirejs.config({
    nodeRequire: require
});

requirejs(['underscore', './js/game/gameServer', './js/game/world', './js/game/player'],
    function (_, GameServer, World, Player) {
        var port = process.env.port || 1337,
            app = express(),
            server = http.Server(app),
            io = socket(server),
            game = new GameServer.GameServer();

        // socket io
        io.on("connection", function (socket) {
            console.log("socket connection " + socket.id);
            // find or start session
            game.connection(socket);

            socket.on('disconnect', function () {
                console.log("socket disconnect");
                game.disconnection(socket);
            });
        });

        // routing
        //app.use('/html', express.static(path.join(__dirname, 'html')));
        app.use('/img', express.static(path.join(__dirname, 'img')));
        app.use('/js', express.static(path.join(__dirname, 'js')));
        app.get('/', function (req, res) {
            res.sendFile(__dirname + '/default.html');
        });

        // start server
        server.listen(port);
        console.log("Express listening on 1337");
    });