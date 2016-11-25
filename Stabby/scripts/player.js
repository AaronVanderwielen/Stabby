define(["require", "exports", 'underscore', "./lib", './controls', './sprite', './world'], function (require, exports, _, Library, Controls, Sprite, World) {
    "use strict";
    (function (Team) {
        Team[Team["aaron"] = 0] = "aaron";
        Team[Team["kevin"] = 1] = "kevin";
    })(exports.Team || (exports.Team = {}));
    var Team = exports.Team;
    (function (PlayerAction) {
        PlayerAction[PlayerAction["Stab"] = 0] = "Stab";
    })(exports.PlayerAction || (exports.PlayerAction = {}));
    var PlayerAction = exports.PlayerAction;
    var Player = (function () {
        function Player(team, isHuman) {
            this.id = Library.guid();
            this.process = {
                d: 0,
                moveY: 0,
                moveX: 0,
                lookx: 0,
                looky: 0,
                strength: 0,
                sprinting: false,
                looking: false,
                slow: 1,
                queuedActions: []
            };
            this.sprite = new Sprite.Sprite(Team[team]);
            this.team = team;
            this.isHuman = isHuman;
            this.canMove = false;
            this.canAct = false;
        }
        Player.prototype.registerControlsUpdates = function (socket) {
            var obj = this;
            socket.on('updatePlayerControls', function (controls) {
                obj.update(controls);
            });
        };
        Player.prototype.update = function (controls) {
            // player can perform action
            this.processControls(controls);
            this.movement(controls);
        };
        Player.prototype.movement = function (controls) {
            //var d = (controls.sprinting && !controls.looking) ? (controls.strength * 4) : ((controls.sprinting && controls.looking) ? (controls.strength * 3) : controls.strength * 2);
            var d = controls.sprinting ? controls.strength * 3 : controls.strength * 1.5;
            this.process.d = Math.ceil(d * this.process.slow);
            this.process.moveY = Math.round(controls.y * this.process.d * this.process.slow);
            this.process.moveX = Math.round(controls.x * this.process.d * this.process.slow);
            this.process.lookx = controls.lookx;
            this.process.looky = controls.looky;
            this.process.strength = controls.strength;
            this.process.sprinting = controls.sprinting;
            this.process.looking = controls.looking;
        };
        Player.prototype.processControls = function (controls) {
            for (var a in controls.keyActions) {
                var keyAction = controls.keyActions[a];
                if (keyAction === Controls.ControlKey.Space) {
                    var playerAction = PlayerAction.Stab;
                    // check to see if there's already an action of this type in queue
                    if (!_.some(this.process.queuedActions, function (a) { return a === playerAction; })) {
                        // new action to process
                        this.process.queuedActions.push(playerAction);
                    }
                }
            }
        };
        Player.prototype.processGamepadActions = function (buttonId) {
            switch (buttonId) {
                case 0:
                    this.process.queuedActions.push(PlayerAction.Stab);
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
                case 8:
                    break;
                case 9:
                    break;
                case 10:
                    break;
                case 11:
                    break;
                case 12:
                    break;
                case 13:
                    break;
                case 14:
                    break;
                case 15:
                    break;
            }
        };
        Player.prototype.processAction = function (game) {
            var obj = this;
            if (obj.canMove) {
                obj.move(game.map);
            }
            if (obj.canAct) {
                if (obj.process.queuedActions[0] === PlayerAction.Stab) {
                    // get nearby enemy player
                    var focusZone = obj.getFocusZone(), nearby = World.Map.getNearbyPlayer(game.map, focusZone.x, focusZone.y, obj.team);
                    // init stab
                    if (nearby != null) {
                        obj.stab(nearby, function (stabbed) {
                            console.log('delete ' + stabbed.id);
                            game.players = _.filter(game.players, function (p) { return p.id !== stabbed.id; });
                            game.map.players = _.filter(game.map.players, function (p) { return p.id !== stabbed.id; });
                            obj.process.queuedActions.splice(0, 1);
                        });
                    }
                    else {
                        obj.process.queuedActions.splice(0, 1);
                    }
                }
            }
        };
        Player.prototype.getFocusZone = function () {
            var obj = this, delta = 40, coords = {
                x: obj.sprite.x,
                y: obj.sprite.y
            };
            if (obj.sprite.currAnim == 0)
                coords.y += delta; // facing down
            if (obj.sprite.currAnim == 1)
                coords.x -= delta; // facing left
            if (obj.sprite.currAnim == 2)
                coords.x += delta; // facing right
            if (obj.sprite.currAnim == 3)
                coords.y -= delta; // facing up
            if (obj.process.moveY < 0)
                coords.y -= delta; // moving up
            if (obj.process.moveX > 0)
                coords.x += delta; // moving right
            if (obj.process.moveY > 0)
                coords.y += delta; // moving down
            if (obj.process.moveX < 0)
                coords.x -= delta; // moving left
            return coords;
        };
        Player.prototype.stab = function (nearby, callback) {
            var obj = this;
            nearby.sprite.currAnim = Sprite.Animation.Death;
            nearby.canAct = false;
            nearby.canAct = false;
            obj.sprite.currAnim = Sprite.Animation.Stab;
            obj.canMove = false;
            obj.canAct = false;
            // stab animation
            setTimeout(function () {
                obj.sprite.currAnim = Sprite.Animation.Down;
                obj.canMove = true;
                obj.canAct = true;
                callback(nearby);
            }, 1000);
        };
        Player.prototype.die = function () {
            if (this.isHuman) {
            }
            else {
            }
        };
        Player.prototype.move = function (map) {
            var obj = this, sprite = this.sprite, nextY = Math.round(sprite.y + obj.process.moveY), nextX = Math.round(sprite.x + obj.process.moveX), yOffset = Math.round(-(Sprite.Sprite.height * (1 - sprite.yAdjust))), nextBlock = World.Map.getBlock(map, nextX, nextY + yOffset), nearbyBlocks = World.Map.getSurroundingBlocks(map, nextX, nextY + yOffset), nearbyObjects = World.Map.getBlocksObjects(map, nearbyBlocks), canMove = true;
            if (nextBlock.type === World.TerrainType.shallow) {
                obj.process.slow = sprite.yAdjust > .75 ? .75 : sprite.yAdjust > .65 ? .5 : .25;
            }
            else if (nextBlock.type === World.TerrainType.ocean || nextBlock.type === World.TerrainType.mountain) {
                canMove = false;
            }
            else {
                obj.process.slow = 1;
            }
            sprite.blockX = nextBlock.x;
            sprite.blockY = nextBlock.y;
            if (canMove) {
                if (nearbyObjects.length > 0) {
                    sprite.passing = false;
                    for (var o in nearbyObjects) {
                        if (nearbyObjects[o].z === sprite.z && nearbyObjects[o].onItem(nextY, nextX)) {
                            if (nearbyObjects[o].pass) {
                                obj.process.slow = nearbyObjects[o].passSlow;
                                sprite.passing = true;
                            }
                            else {
                                canMove = false;
                            }
                        }
                    }
                }
                else {
                    sprite.passing = false;
                }
            }
            if (obj.process.looking && (Math.abs(obj.process.lookx) > 0 || Math.abs(obj.process.looky) > 0)) {
                sprite.currAnim = (Math.abs(obj.process.lookx) > Math.abs(obj.process.looky)) ? (obj.process.lookx > 0 ? 2 : 1) : (obj.process.looky > 0 ? 0 : 3);
            }
            else if (Math.abs(obj.process.moveX) > 0 || Math.abs(obj.process.moveY) > 0) {
                sprite.currAnim = (Math.abs(obj.process.moveX) > Math.abs(obj.process.moveY)) ? (obj.process.moveX > 0 ? 2 : 1) : (obj.process.moveY > 0 ? 0 : 3);
            }
            if (obj.process.strength > 0) {
                if (canMove && obj.process.d > 0) {
                    if (sprite.stepCounter >= 80)
                        sprite.stepDir = -1;
                    else if (sprite.stepCounter <= 0)
                        sprite.stepDir = 1;
                    sprite.stepCounter += (obj.process.d * sprite.stepDir);
                    //sprite.currAnim = (Math.abs(obj.process.moveX) > Math.abs(obj.process.moveY)) ? (obj.process.moveX > 0 ? 1 : 3) : (obj.process.moveY > 0 ? 2 : 0);
                    sprite.currStep = sprite.stepCounter < 20 ? 0 : sprite.stepCounter > 60 ? 2 : 1;
                    sprite.x = nextX;
                    sprite.y = nextY;
                }
            }
            sprite.sectionId = World.Map.getSectionId(map, sprite.x, sprite.y, 'p');
        };
        return Player;
    }());
    exports.Player = Player;
});
