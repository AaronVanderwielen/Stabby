import _ = require('underscore');
import Library = require("./lib");
import Game = require('./gameServer');
import Controls = require('./controls');
import Sprite = require('./sprite');
import World = require('./world');

export enum Team {
    aaron = 0,
    kevin = 1
}

export interface PlayerProcess {
    d: number
    moveY: number;
    moveX: number;
    lookx: number;
    looky: number;
    strength: number;
    sprinting: boolean;
    looking: boolean;
    slow: number;
    queuedActions: PlayerAction[];
}

export enum PlayerAction {
    Stab
}

export class Player {
    id: string;
    socketId: string;
    process: PlayerProcess;
    sprite: Sprite.Sprite;
    team: Team;
    isHuman: boolean;
    canMove: boolean;
    canAct: boolean;

    constructor(team: Team, isHuman: boolean) {
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

    registerControlsUpdates(socket: SocketIO.Socket) {
        var obj = this;
        socket.on('updatePlayerControls', function (controls: Controls.KeyboardControls) {
            obj.update(controls);
        });
    }

    update(controls: Controls.KeyboardControls) {
        // player can perform action
        this.processControls(controls);
        this.movement(controls);
    }

    movement(controls: Controls.KeyboardControls) {
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
    }

    processControls(controls: Controls.KeyboardControls) {
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
    }

    processGamepadActions(buttonId: number) {
        switch (buttonId) {
            case 0: // a
                this.process.queuedActions.push(PlayerAction.Stab);
                break;
            case 1: // b
                break;
            case 2: // x
                break;
            case 3: // y
                break;
            case 4: // lb
                break;
            case 5: // rb
                break;
            case 6: // lt
                break;
            case 7: // rt
                break;
            case 8: // back
                break;
            case 9: // start
                break;
            case 10: // l3
                break;
            case 11: // r3
                break;
            case 12: // up on d-pad
                break;
            case 13: // down on d-pad
                break;
            case 14: // left on d-pad
                break;
            case 15: // right on d-pad
                break;
        }
    }

    processAction(game: Game.GameData) {
        var obj = this;
        if (obj.canMove) {
            obj.move(game.map);
        }

        if (obj.canAct) {
            if (obj.process.queuedActions[0] === PlayerAction.Stab) {
                // get nearby enemy player
                var focusZone = obj.getFocusZone(),
                    nearby: Player = World.Map.getNearbyPlayer(game.map, focusZone.x, focusZone.y, obj.team);

                // init stab
                if (nearby != null) {
                    obj.stab(nearby, function (stabbed: Player) {
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
    }

    getFocusZone() {
        var obj = this,
            delta = 40,
            coords = {
                x: obj.sprite.x,
                y: obj.sprite.y
            };

        if (obj.sprite.currAnim == 0) coords.y += delta; // facing down
        if (obj.sprite.currAnim == 1) coords.x -= delta; // facing left
        if (obj.sprite.currAnim == 2) coords.x += delta; // facing right
        if (obj.sprite.currAnim == 3) coords.y -= delta; // facing up

        if (obj.process.moveY < 0) coords.y -= delta; // moving up
        if (obj.process.moveX > 0) coords.x += delta; // moving right
        if (obj.process.moveY > 0) coords.y += delta; // moving down
        if (obj.process.moveX < 0) coords.x -= delta; // moving left

        return coords;
    }

    stab(nearby: Player, callback: Function) {
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
    }

    die() {
        if (this.isHuman) {
            // check if all humans on this team are dead
            // if so, fade out all non-humans, call winner
            // if not, fade out all this human's clones, destroy this player
        }
        else {
            // destroy sprite

        }
    }

    move(map: World.Map) {
        var obj = this,
            sprite = this.sprite,
            nextY = Math.round(sprite.y + obj.process.moveY),
            nextX = Math.round(sprite.x + obj.process.moveX),
            yOffset = Math.round(-(Sprite.Sprite.height * (1 - sprite.yAdjust))),
            nextBlock = World.Map.getBlock(map, nextX, nextY + yOffset),
            nearbyBlocks = World.Map.getSurroundingBlocks(map, nextX, nextY + yOffset),
            nearbyObjects = World.Map.getBlocksObjects(map, nearbyBlocks),
            canMove = true;

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
                if (sprite.stepCounter >= 80) sprite.stepDir = -1;
                else if (sprite.stepCounter <= 0) sprite.stepDir = 1;

                sprite.stepCounter += (obj.process.d * sprite.stepDir);

                //sprite.currAnim = (Math.abs(obj.process.moveX) > Math.abs(obj.process.moveY)) ? (obj.process.moveX > 0 ? 1 : 3) : (obj.process.moveY > 0 ? 2 : 0);
                sprite.currStep = sprite.stepCounter < 20 ? 0 : sprite.stepCounter > 60 ? 2 : 1;

                sprite.x = nextX;
                sprite.y = nextY;
            }
        }

        sprite.sectionId = World.Map.getSectionId(map, sprite.x, sprite.y, 'p');
    }
}