import Lib = require("./lib");
import World = require("./world");

export enum Animation {
    Down = 0,
    Left = 1,
    Right = 2,
    Up = 3,
    Stab = 4,
    Death = 5
}

export class Sprite implements World.IMapObject {
    id: string;
    imgId: string;
    mapObjectType: World.MapObjectType;
    x: number;
    y: number;
    z: number;
    sectionId: string;
    yAdjust: number;
    currAnim: number;
    prevAnim: number;
    stepCounter: number;
    stepDir: number;
    currStep: number;
    blockX: number;
    blockY: number;
    pass: boolean;
    passSlow: number;
    passing: boolean;
    canPickup: boolean;

    constructor(imgId: string) {//, asset: Asset, imgCache: Array<CachedImageData>) {
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

    static height = 96;
    static width = 72;

    onItem(y: number, x: number) {
        return (y >= this.y && y <= this.y + Sprite.height) && (x >= this.x && x <= this.x + Sprite.width);
    }
}