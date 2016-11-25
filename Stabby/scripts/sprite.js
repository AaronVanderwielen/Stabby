define(["require", "exports", "./lib", "./world"], function (require, exports, Lib, World) {
    "use strict";
    (function (Animation) {
        Animation[Animation["Down"] = 0] = "Down";
        Animation[Animation["Left"] = 1] = "Left";
        Animation[Animation["Right"] = 2] = "Right";
        Animation[Animation["Up"] = 3] = "Up";
        Animation[Animation["Stab"] = 4] = "Stab";
        Animation[Animation["Death"] = 5] = "Death";
    })(exports.Animation || (exports.Animation = {}));
    var Animation = exports.Animation;
    var Sprite = (function () {
        function Sprite(imgId) {
            var sprite = this;
            sprite.imgId = imgId;
            sprite.id = Lib.guid();
            sprite.mapObjectType = World.MapObjectType.sprite;
            sprite.z = 1;
            sprite.currAnim = 0;
            sprite.currStep = 1;
            sprite.stepCounter = 0;
            sprite.stepDir = 1;
            sprite.yAdjust = 1; // used to cut sprite off early, like when partly underwater
            sprite.pass = false;
            sprite.passSlow = 0;
            sprite.passing = false;
            sprite.canPickup = false;
        }
        Sprite.prototype.onItem = function (y, x) {
            return (y >= this.y && y <= this.y + Sprite.height) && (x >= this.x && x <= this.x + Sprite.width);
        };
        Sprite.height = 96;
        Sprite.width = 72;
        return Sprite;
    }());
    exports.Sprite = Sprite;
});
