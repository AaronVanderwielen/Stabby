define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ControlKey;
    (function (ControlKey) {
        ControlKey[ControlKey["W"] = 87] = "W";
        ControlKey[ControlKey["D"] = 68] = "D";
        ControlKey[ControlKey["S"] = 83] = "S";
        ControlKey[ControlKey["A"] = 65] = "A";
        ControlKey[ControlKey["Space"] = 32] = "Space";
        ControlKey[ControlKey["Shift"] = 16] = "Shift"; //shift
    })(ControlKey = exports.ControlKey || (exports.ControlKey = {}));
    var KeyboardControls = /** @class */ (function () {
        function KeyboardControls() {
            this.x = 0;
            this.y = 0;
            this.keyActions = [];
            this.lookx = 0;
            this.looky = 0;
            this.strength = 0;
            this.sprinting = false;
            this.looking = false;
            this.initKeyboard();
        }
        KeyboardControls.prototype.initKeyboard = function () {
            var obj = this;
            $(document).off('keydown').on('keydown', function (e) {
                if (e.keyCode == ControlKey.W)
                    obj.y = -1;
                if (e.keyCode == ControlKey.S)
                    obj.y = 1;
                if (e.keyCode == ControlKey.A)
                    obj.x = -1;
                if (e.keyCode == ControlKey.D)
                    obj.x = 1;
                if (e.keyCode == ControlKey.Space) {
                    obj.keyActions.push(ControlKey.Space);
                }
                if (e.keyCode == ControlKey.Shift) {
                    obj.sprinting = true;
                }
                if (obj.y !== 0 || obj.x !== 0)
                    obj.strength = 2;
            });
            $(document).off('keyup').on('keyup', function (e) {
                if (e.keyCode == ControlKey.W)
                    obj.y = 0;
                if (e.keyCode == ControlKey.S)
                    obj.y = 0;
                if (e.keyCode == ControlKey.A)
                    obj.x = 0;
                if (e.keyCode == ControlKey.D)
                    obj.x = 0;
                if (e.keyCode == ControlKey.Space) {
                    obj.keyActions = _.reject(obj.keyActions, function (a) { return a == ControlKey.Space; });
                }
                if (e.keyCode == ControlKey.Shift) {
                    obj.sprinting = false;
                }
                if (obj.y === 0 && obj.x === 0)
                    obj.strength = 0;
            });
        };
        KeyboardControls.prototype.gamepadReport = function () {
            var obj = this, gp = window.navigator['getGamepads']()[0];
            if (gp) {
                for (var i = 0; i < gp.buttons.length; i++) {
                    var existingAction = _.find(obj.keyActions, function (a) { return a === i; });
                    if (gp.buttons[i].pressed) {
                        //console.log(i);
                        if (!existingAction) {
                            // new action
                            obj.keyActions.push(i);
                        }
                    }
                    else {
                        // no longer holding button
                        if (existingAction) {
                            // remove from actions
                            obj.keyActions = _.reject(obj.keyActions, function (a) { return a === i; });
                        }
                    }
                }
                if (Math.abs(gp.axes[1]) > 0.1 || Math.abs(gp.axes[0]) > 0.1) {
                    var x = gp.axes[0], y = gp.axes[1], c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), strength = c < .2 ? 1 : (c < .8 ? 1.5 : 2);
                    obj.x = x;
                    obj.y = y;
                    obj.strength = strength;
                }
                else {
                    obj.x = 0;
                    obj.y = 0;
                    obj.strength = 0;
                }
                if (Math.abs(gp.axes[3]) > 0.1 || Math.abs(gp.axes[2]) > 0.1) {
                    obj.looking = true;
                    obj.lookx = gp.axes[2];
                    obj.looky = gp.axes[3];
                }
                else {
                    obj.looking = false;
                    obj.lookx = 0;
                    obj.looky = 0;
                }
                obj.sprinting = gp.buttons[10].pressed;
            }
        };
        return KeyboardControls;
    }());
    exports.KeyboardControls = KeyboardControls;
});
//# sourceMappingURL=controls.js.map