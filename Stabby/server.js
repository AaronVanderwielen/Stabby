var http = require('http'),
    express = require('express'),
    path = require('path'),
    socket = require("socket.io"),
    requirejs = require('requirejs');

// configure requirejs
requirejs.config({
    nodeRequire: require
});

// server and socket io
var port = process.env.port || 1337,
    app = express(),
    server = http.Server(app),
    io = socket(server),
    gameServer = requirejs('./scripts/gameServer'),
    game = new gameServer.GameServer();

// socket io
io.on("connection", function (socket) {
    console.log("socket connection " + socket.id);
    // find or start session
    game.connection(socket);
});

io.on('disconnect', function () {
    console.log("socket disconnect");
});

// routing
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/default.html');
});

// start server
server.listen(port);
console.log("Express listening on 1337");