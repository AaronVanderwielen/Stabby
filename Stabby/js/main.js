require.config({
    baseUrl: '/js',
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        socketio: {
            exports: 'io'
        },
        createjs: {
            exports: 'createjs'
        }
    },
    paths: {
        jquery: 'util/jquery.min',
        underscore: 'util/underscore',
        socketio: 'util/socket.io-1.3.5',
        createjs: 'util/createjs-2015.05.21.min'
    }
});

var io;
requirejs(['jquery', 'underscore', 'socketio', 'createjs', 'manager', 'world', 'player', 'sprite', 'render', 'gameServer', 'controls', 'lib'],
    function (jquery, underscore, socketio, createJS, Manager, World, Player, Sprite, Render, GameServer, Controls, Lib) {
    io = socketio;
    new Manager.Manager().initGame();
});