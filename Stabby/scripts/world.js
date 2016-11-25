define(["require", "exports", './lib'], function (require, exports, Lib) {
    "use strict";
    (function (TerrainType) {
        TerrainType[TerrainType["ocean"] = 0] = "ocean";
        TerrainType[TerrainType["shallow"] = 1] = "shallow";
        TerrainType[TerrainType["beach"] = 2] = "beach";
        TerrainType[TerrainType["dirt"] = 3] = "dirt";
        TerrainType[TerrainType["grass"] = 4] = "grass";
        TerrainType[TerrainType["rock"] = 5] = "rock";
        TerrainType[TerrainType["mountain"] = 6] = "mountain";
        TerrainType[TerrainType["lava"] = 7] = "lava";
    })(exports.TerrainType || (exports.TerrainType = {}));
    var TerrainType = exports.TerrainType;
    (function (MapObjectType) {
        MapObjectType[MapObjectType["item"] = 0] = "item";
        MapObjectType[MapObjectType["sprite"] = 1] = "sprite";
    })(exports.MapObjectType || (exports.MapObjectType = {}));
    var MapObjectType = exports.MapObjectType;
    (function (ItemType) {
        ItemType[ItemType["tree"] = 0] = "tree";
        ItemType[ItemType["berry"] = 1] = "berry";
        ItemType[ItemType["bush"] = 2] = "bush";
        ItemType[ItemType["fern"] = 3] = "fern";
        ItemType[ItemType["flowerA"] = 4] = "flowerA";
        ItemType[ItemType["flowerB"] = 5] = "flowerB";
        ItemType[ItemType["mushroom"] = 6] = "mushroom";
        ItemType[ItemType["grassA"] = 7] = "grassA";
        ItemType[ItemType["grassB"] = 8] = "grassB";
        ItemType[ItemType["grassC"] = 9] = "grassC";
        ItemType[ItemType["grassD"] = 10] = "grassD";
        ItemType[ItemType["plant"] = 11] = "plant";
        ItemType[ItemType["rockA"] = 12] = "rockA";
        ItemType[ItemType["rockB"] = 13] = "rockB";
        ItemType[ItemType["rockC"] = 14] = "rockC";
        ItemType[ItemType["rockD"] = 15] = "rockD";
        ItemType[ItemType["rockE"] = 16] = "rockE";
        ItemType[ItemType["rocksA"] = 17] = "rocksA";
        ItemType[ItemType["rocksB"] = 18] = "rocksB";
        ItemType[ItemType["bone"] = 19] = "bone";
        ItemType[ItemType["log"] = 20] = "log";
        ItemType[ItemType["stickA"] = 21] = "stickA";
        ItemType[ItemType["stickB"] = 22] = "stickB";
    })(exports.ItemType || (exports.ItemType = {}));
    var ItemType = exports.ItemType;
    var MapItem = (function () {
        function MapItem(itemType) {
            this.id = Lib.guid();
            this.mapObjectType = MapObjectType.item;
            this.getItem(itemType);
            this.passing = false;
        }
        MapItem.mapItemKey = function (itemType) {
            return "mapitem_" + ItemType[itemType].toString();
        };
        MapItem.getItemData = function (itemType) {
            var data = {
                x: 0,
                y: 0,
                z: 0,
                width: 1,
                height: 1,
                multiplier: 1,
                pass: false,
                passSlow: 1,
                canPickup: false,
                stack: 1
            };
            switch (itemType) {
                case ItemType.berry:
                    data.x = 11;
                    data.y = 0;
                    data.z = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.bone:
                    data.x = 8;
                    data.y = 5;
                    data.canPickup = true;
                    break;
                case ItemType.bush:
                    data.x = 10;
                    data.y = 0;
                    data.z = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.fern:
                    data.x = 1;
                    data.y = 5;
                    data.z = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.flowerA:
                    data.x = 0;
                    data.y = 5;
                    data.canPickup = true;
                    break;
                case ItemType.flowerB:
                    data.x = 0;
                    data.y = 6;
                    data.canPickup = true;
                    break;
                case ItemType.grassA:
                    data.x = 4;
                    data.y = 6;
                    break;
                case ItemType.grassB:
                    data.x = 4;
                    data.y = 7;
                    break;
                case ItemType.grassC:
                    data.x = 5;
                    data.y = 7;
                    break;
                case ItemType.grassD:
                    data.x = 5;
                    data.y = 6;
                    break;
                case ItemType.log:
                    data.x = 7;
                    data.y = 5;
                    data.z = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.mushroom:
                    data.x = 4;
                    data.y = 5;
                    data.canPickup = true;
                    break;
                case ItemType.plant:
                    data.x = 8;
                    data.y = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.rockA:
                    data.x = 8;
                    data.y = 3;
                    data.z = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.rockB:
                    data.x = 9;
                    data.y = 3;
                    data.z = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.rockC:
                    data.x = 10;
                    data.y = 3;
                    data.z = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.rockD:
                    data.x = 1;
                    data.y = 7;
                    data.z = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.rockE:
                    data.x = 3;
                    data.y = 7;
                    data.z = 1;
                    data.multiplier = 2;
                    break;
                case ItemType.rocksA:
                    data.x = 0;
                    data.y = 7;
                    data.canPickup = true;
                    data.stack = 3;
                    break;
                case ItemType.rocksB:
                    data.x = 2;
                    data.y = 7;
                    data.canPickup = true;
                    data.stack = 3;
                    break;
                case ItemType.stickA:
                    data.x = 6;
                    data.y = 0;
                    data.canPickup = true;
                    break;
                case ItemType.stickB:
                    data.x = 7;
                    data.y = 0;
                    data.canPickup = true;
                    break;
                case ItemType.tree:
                    data.x = 6;
                    data.y = 6;
                    data.z = 1;
                    data.height = 2;
                    data.width = 2;
                    data.pass = true;
                    data.passSlow = .5;
                    break;
            }
            return data;
        };
        MapItem.prototype.getItem = function (itemType) {
            var data = MapItem.getItemData(itemType), width = (data.width * 50) * data.multiplier, height = (data.height * 50) * data.multiplier;
            this.itemType = itemType;
            this.height = height;
            this.width = width;
            this.z = data.z;
            this.pass = data.pass;
            this.passSlow = data.passSlow;
            this.canPickup = data.canPickup;
            this.stack = data.stack;
            this.imgId = MapItem.mapItemKey(itemType);
        };
        MapItem.prototype.onItem = function (y, x) {
            var startY = this.y - (this.height / 2), endY = startY + this.height, startX = this.x - (this.width / 2), endX = startX + this.width;
            return (y >= startY && y <= endY) && (x >= startX && x <= endX);
        };
        return MapItem;
    }());
    exports.MapItem = MapItem;
    var World = (function () {
        function World(x, y, tileSize, gradientSize) {
            this.numX = x;
            this.numY = y;
            //// sections are 25b x 25b
            //this.bxps = 25;
            //this.byps = 25;
            this.tileSize = tileSize;
            this.gradientSize = gradientSize;
            //// create cached canvas--will be used to hold 3 x 3 sections, updated on section change
            //// this is where the viewport is extracted from
            //this.worldCache = {};
            //// initialize canvases
            //this.sections = [];
            //this.createSectionCanvases();
            // world
            this.initGrid();
            this.build();
            this.createMapObjects();
        }
        World.prototype.initGrid = function () {
            // init grid
            this.map = new Map(this.numX, this.numY, this.tileSize);
            this.map.grid = [];
            // initialize empty blocks in grid
            for (var y = 0; y < this.numY; y++) {
                for (var x = 0; x < this.numX; x++) {
                    var block = {
                        x: x,
                        y: y,
                        objects: [],
                        sectionId: Map.getSectionId(this.map, x, y, 'b')
                    };
                    if (x === 0) {
                        this.map.grid[y] = [];
                    }
                    this.map.grid[y][x] = block;
                }
            }
            // apply pointers to nearby
            //for (var j in this.map.grid) {
            //    var row = this.map.grid[j];
            //    for (var k in row) {
            //        var b = row[k];
            //        this.setNearbyPointers(b);
            //    }
            //}
        };
        World.prototype.build = function () {
            this.createOcean();
            this.createBeach();
            //this.createMountain();
            // fill with dirt
            this.fill(this.gradientSize * 4, this.numX - (this.gradientSize * 4), this.gradientSize * 4, this.numY - (this.gradientSize * 4), TerrainType.dirt, false);
            // add grass patches to dirt randomly
            this.createGrass(.1, 3);
            //this.createRiversAndLakes(.005, .002);
        };
        World.prototype.createOcean = function () {
            // create deep water
            this.layerEmptyTop(0, this.numX, 0, TerrainType.ocean, TerrainType.shallow, true);
            this.layerEmptyRight(this.numX - 1, 0, this.numY, TerrainType.ocean, TerrainType.shallow, true);
            this.layerEmptyBelow(0, this.numX, this.numY - 1, TerrainType.ocean, TerrainType.shallow, true);
            this.layerEmptyLeft(0, 0, this.numY, TerrainType.ocean, TerrainType.shallow, true);
            // shallow water/start of beach
            this.layerEmptyTop(this.gradientSize, this.numX - this.gradientSize, this.gradientSize, TerrainType.shallow, TerrainType.beach);
            this.layerEmptyRight(this.numX - this.gradientSize - 1, this.gradientSize, this.numY - this.gradientSize, TerrainType.shallow, TerrainType.beach);
            this.layerEmptyBelow(this.gradientSize, this.numX - this.gradientSize, this.numY - this.gradientSize - 1, TerrainType.shallow, TerrainType.beach);
            this.layerEmptyLeft(this.gradientSize, this.gradientSize, this.numY - this.gradientSize, TerrainType.shallow, TerrainType.beach);
        };
        World.prototype.createBeach = function () {
            var gOffset = 3;
            this.layerEmptyTop(this.gradientSize * gOffset, this.numX - (this.gradientSize * gOffset) + 1, this.gradientSize * gOffset, TerrainType.beach, TerrainType.dirt);
            this.layerEmptyRight(this.numX - 1 - (this.gradientSize * gOffset), this.gradientSize * gOffset, this.numY - (this.gradientSize * gOffset), TerrainType.beach, TerrainType.dirt);
            this.layerEmptyBelow(this.gradientSize * gOffset, this.numX - (this.gradientSize * gOffset) + 1, this.numY - 1 - (this.gradientSize * gOffset), TerrainType.beach, TerrainType.dirt);
            this.layerEmptyLeft(this.gradientSize * gOffset, this.gradientSize * gOffset, this.numY - (this.gradientSize * gOffset) + 1, TerrainType.beach, TerrainType.dirt);
        };
        World.prototype.createGrass = function (chance, size) {
            for (var y = 0; y < this.numY; y++) {
                for (var x = 0; x < this.numX; x++) {
                    var block = this.map.grid[y][x];
                    if (block.type === TerrainType.dirt) {
                        // roll for grass
                        var rand = Math.random();
                        if (rand <= chance) {
                            this.randShape(x, y, Math.round(Math.random() * size), 1, TerrainType.grass, [TerrainType.dirt]);
                        }
                    }
                }
            }
        };
        World.prototype.createMountain = function () {
            this.randShape(Math.round(this.numX / 2), Math.round(this.numY / 2), this.gradientSize * 4, 1, TerrainType.rock);
            this.randShape(Math.round(this.numX / 2), Math.round(this.numY / 2), this.gradientSize * 2, 1, TerrainType.mountain, [TerrainType.rock]);
            this.randShape(Math.round(this.numX / 2), Math.round(this.numY / 2), Math.round(this.gradientSize / 3), 1, TerrainType.lava, [TerrainType.mountain]);
        };
        World.prototype.createRiversAndLakes = function (riverChance, lakeChance) {
            for (var y = 0; y < this.numY; y++) {
                if (y < this.gradientSize * 3 || y > this.numY - (this.gradientSize * 3)) {
                    for (var x = 0; x < this.numX; x++) {
                        if (x < this.gradientSize * 3 || x > this.numX - (this.gradientSize * 3)) {
                            var block = this.map.grid[y][x];
                            if (block.type === TerrainType.shallow) {
                                // roll for river
                                var riverRoll = Math.random();
                                if (riverRoll <= riverChance) {
                                    console.log('river starting at ' + y + ',' + x);
                                    // now snake towards mountain
                                    var distX = (this.numX / 3) - block.x, distY = (this.numY / 2) - block.y, nextX = block.x, nextY = block.y, prevDir = (block.x > this.gradientSize * 4 && block.x < this.numX - this.gradientSize * 4) ? 'y' : 'x', nextBlock = block;
                                    while ((distX !== 0 || distY !== 0) && nextBlock.type !== TerrainType.mountain) {
                                        // roll for lake
                                        var lakeRoll = Math.random();
                                        if (lakeRoll <= lakeChance) {
                                            console.log('river ending with lake at ' + nextBlock.y + ',' + nextBlock.x);
                                            this.randShape(nextBlock.x, nextBlock.y, Math.ceil(Math.random() * (this.gradientSize)), 1, TerrainType.ocean, [TerrainType.shallow, TerrainType.beach, TerrainType.dirt, TerrainType.grass, TerrainType.rock]);
                                            this.randShape(nextBlock.x, nextBlock.y, Math.ceil(this.gradientSize + (Math.random() * this.gradientSize)), 1, TerrainType.shallow, [TerrainType.beach, TerrainType.dirt, TerrainType.grass, TerrainType.rock]);
                                            break;
                                        }
                                        else {
                                            this.randShape(nextBlock.x, nextBlock.y, Math.ceil(Math.random() * (this.gradientSize / 2)), 0, TerrainType.shallow, [TerrainType.beach, TerrainType.dirt, TerrainType.grass, TerrainType.rock]);
                                            var chanceX = Math.random(), chanceY = Math.random();
                                            if (distX !== 0 && chanceX < (prevDir === 'x' ? .8 : .2)) {
                                                prevDir = 'x';
                                                if (distX < 0) {
                                                    nextX--;
                                                }
                                                else {
                                                    nextX++;
                                                }
                                            }
                                            if (distY !== 0 && chanceY < (prevDir === 'y' ? .8 : .2)) {
                                                prevDir = 'y';
                                                if (distY < 0) {
                                                    nextY--;
                                                }
                                                else {
                                                    nextY++;
                                                }
                                            }
                                            nextBlock = this.map.grid[nextY][nextX];
                                            // recalculate distance to center
                                            distX = (this.numX / 2) - nextBlock.x;
                                            distY = (this.numY / 2) - nextBlock.y;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (var y = 0; y < this.numY; y++) {
                for (var x = 0; x < this.numX; x++) {
                    var block = this.map.grid[y][x];
                    if (block.type == TerrainType.grass) {
                        // roll for lake
                        var roll = Math.random();
                        if (roll < lakeChance) {
                            console.log("creating lake at " + block.y + ',' + block.x);
                            this.randShape(block.x, block.y, Math.ceil(Math.random() * (this.gradientSize)), 1, TerrainType.ocean, [TerrainType.shallow, TerrainType.beach, TerrainType.dirt, TerrainType.grass, TerrainType.rock]);
                            this.randShape(block.x, block.y, Math.ceil(this.gradientSize + (Math.random() * this.gradientSize)), 1, TerrainType.shallow, [TerrainType.beach, TerrainType.dirt, TerrainType.grass, TerrainType.rock]);
                        }
                    }
                }
            }
        };
        World.prototype.rollForItem = function (block, chanceTypes) {
            // roll for chance
            var rand = Math.random(), prev = 0;
            // chance types = [{ c: .1, types: [] }]
            for (var c in chanceTypes) {
                if (rand >= prev && rand <= prev + chanceTypes[c].c) {
                    // now pick random item
                    var itemType = chanceTypes[c].types[Math.round(Math.random() * (chanceTypes[c].types.length - 1))], item = new MapItem(itemType);
                    item.x = item.width >= (this.tileSize / 2) ? block.x * this.tileSize + (this.tileSize / 2) : block.x * this.tileSize + (this.tileSize / 2);
                    item.y = item.height >= (this.tileSize / 2) ? block.y * this.tileSize + (this.tileSize / 2) : block.y * this.tileSize + (this.tileSize / 2);
                    item.blockX = block.x;
                    item.blockY = block.y;
                    item.sectionId = block.sectionId;
                    this.map.objects.push(item);
                    block.objects.push(item);
                }
                prev += chanceTypes[c].c;
            }
        };
        World.prototype.randShape = function (cx, cy, d, smooth, type, overwrite) {
            var startX = Math.round(cx - d - (d * Math.random())), endX = Math.round(cx + d + (d * Math.random())), startY = cy - d, endY = cy + d, prevPushA = 0, prevPushB = 0;
            startX = startX >= 0 ? startX : 0;
            startX = startX < this.numX ? startX : this.numX - 1;
            endX = endX >= 0 ? endX : 0;
            endX = endX < this.numX ? endX : this.numX - 1;
            startY = startY >= 0 ? startY : 0;
            startY = startY < this.numY ? startY : this.numY - 1;
            endY = endY >= 0 ? endY : 0;
            endY = endY < this.numY ? endY : this.numY - 1;
            for (var x = startX; x <= endX; x++) {
                var xFactor = d - Math.abs(cx - x), pushA = Math.round(d * Math.random()) + (xFactor > d / 2 ? d / 2 : xFactor), // random stretch above y center, make distance from x center factor
                evenedA = pushA, pushB = Math.round(d * Math.random()) + (xFactor > d / 2 ? d / 2 : xFactor), // random stretch below y center, make distance from x center factor
                evenedB = pushB;
                // for n of smooth, make this next one closer previous
                for (var s = 0; s < smooth; s++) {
                    evenedA = Math.round((evenedA + prevPushA) / 2);
                    evenedB = Math.round((evenedB + prevPushB) / 2);
                }
                for (var y = startY; y <= endY; y++) {
                    if (!this.typeIsSet(this.map.grid[y][x]) || (overwrite && overwrite.indexOf(this.map.grid[y][x].type) > -1)) {
                        // if y is center or y is higher but greater than even or y is lower but less than even, make type
                        if ((y == cy && (evenedA > 0 || evenedB > 0)) || (y < cy && y >= cy - evenedA) || (y > cy && y <= cy + evenedB)) {
                            this.setType(this.map.grid[y][x], type);
                        }
                    }
                }
                prevPushA = evenedA;
                prevPushB = evenedB;
            }
        };
        World.prototype.layerEmptyTop = function (startX, endX, startY, type, fillType, overwrite) {
            var prevPush = this.gradientSize;
            for (var x = startX; x < endX; x++) {
                var random = Math.random(), push = Math.round(this.gradientSize * random), middle = Math.round((push + prevPush) / 2);
                for (var y = startY; y < startY + (this.gradientSize * 2); y++) {
                    if (overwrite || !this.typeIsSet(this.map.grid[y][x])) {
                        if (y < startY + this.gradientSize + middle) {
                            this.setType(this.map.grid[y][x], type);
                        }
                        else if (fillType && this.map.grid[y][x].type != type) {
                            this.setType(this.map.grid[y][x], fillType);
                        }
                    }
                }
                prevPush = push;
            }
        };
        World.prototype.layerEmptyRight = function (startX, startY, endY, type, fillType, overwrite) {
            var prevPush = this.gradientSize;
            for (var y = startY; y < endY; y++) {
                var random = Math.random(), push = Math.round(this.gradientSize * random), middle = Math.round((push + prevPush) / 2);
                for (var x = startX; x > startX - (this.gradientSize * 2); x--) {
                    if (overwrite || !this.typeIsSet(this.map.grid[y][x])) {
                        if (x > startX - (this.gradientSize + middle)) {
                            this.setType(this.map.grid[y][x], type);
                        }
                        else if (fillType && this.map.grid[y][x].type != type) {
                            this.setType(this.map.grid[y][x], fillType);
                        }
                    }
                }
                prevPush = push;
            }
        };
        World.prototype.layerEmptyBelow = function (startX, endX, startY, type, fillType, overwrite) {
            var prevPush = this.gradientSize;
            for (var x = startX; x < endX; x++) {
                var random = Math.random(), push = Math.round(this.gradientSize * random), middle = Math.round((push + prevPush) / 2);
                for (var y = startY; y > startY - (this.gradientSize * 2); y--) {
                    if (overwrite || !this.typeIsSet(this.map.grid[y][x])) {
                        if (y > startY - (this.gradientSize + middle)) {
                            this.setType(this.map.grid[y][x], type);
                        }
                        else if (fillType && this.map.grid[y][x].type != type) {
                            this.setType(this.map.grid[y][x], fillType);
                        }
                    }
                }
                prevPush = push;
            }
        };
        World.prototype.layerEmptyLeft = function (startX, startY, endY, type, fillType, overwrite) {
            var prevPush = this.gradientSize;
            for (var y = startY; y < endY; y++) {
                // generate values for random edges
                var random = Math.random(), push = Math.round((this.gradientSize * random)), middle = Math.round((push + prevPush) / 2); // keeps close rows similar 
                // loop through min * 2 for x and set the ocean/beach values
                for (var x = startX; x < startX + (this.gradientSize * 2); x++) {
                    if (overwrite || !this.typeIsSet(this.map.grid[y][x])) {
                        if (x < startX + this.gradientSize + middle) {
                            this.setType(this.map.grid[y][x], type);
                        }
                        else if (fillType && this.map.grid[y][x].type != type) {
                            this.setType(this.map.grid[y][x], fillType);
                        }
                    }
                }
                prevPush = push;
            }
        };
        World.prototype.createMapObjects = function () {
            for (var sy = 0; sy < this.map.sectionsY; sy++) {
                for (var sx = 0; sx < this.map.sectionsX; sx++) {
                    var startX = sx * (this.numX / this.map.sectionsX), endX = startX + (this.numX / this.map.sectionsX), startY = sy * (this.numY / this.map.sectionsY), endY = startY + (this.numY / this.map.sectionsY);
                    for (var y = startY; y < endY; y++) {
                        var row = this.map.grid[y];
                        for (var x = startX; x < endX; x++) {
                            var block = row[x];
                            var chanceTypes;
                            if (block.type === TerrainType.beach) {
                                chanceTypes = [
                                    { c: .005, types: [ItemType.rockA, ItemType.rockB, ItemType.rockC, ItemType.bone] }
                                ];
                                this.rollForItem(block, chanceTypes);
                            }
                            else if (block.type === TerrainType.dirt) {
                                chanceTypes = [
                                    { c: .01, types: [ItemType.rockA, ItemType.rockB, ItemType.rockC, ItemType.bone] },
                                    { c: .005, types: [ItemType.log, ItemType.stickA, ItemType.stickB] }
                                ];
                                this.rollForItem(block, chanceTypes);
                            }
                            else if (block.type === TerrainType.grass) {
                                chanceTypes = [
                                    { c: .005, types: [ItemType.rocksA, ItemType.rocksB, ItemType.rockD, ItemType.rockE] },
                                    { c: .005, types: [ItemType.bone, ItemType.stickA, ItemType.stickB] },
                                    { c: .1, types: [ItemType.grassA, ItemType.grassB, ItemType.grassC, ItemType.grassD] },
                                    { c: .01, types: [ItemType.berry, ItemType.bush, ItemType.fern, ItemType.flowerA, ItemType.flowerB, ItemType.mushroom, ItemType.plant, ItemType.log] },
                                    { c: .05, types: [ItemType.tree] }
                                ];
                                this.rollForItem(block, chanceTypes);
                            }
                            else if (block.type === TerrainType.rock) {
                                chanceTypes = [
                                    { c: .05, types: [ItemType.rockA, ItemType.rockB, ItemType.rockC] }
                                ];
                                this.rollForItem(block, chanceTypes);
                            }
                        }
                    }
                }
            }
        };
        World.prototype.fill = function (startX, endX, startY, endY, fillType, overwrite) {
            for (var y = startY; y < endY; y++) {
                for (var x = startX; x < endX; x++) {
                    if (overwrite || !this.typeIsSet(this.map.grid[y][x])) {
                        this.setType(this.map.grid[y][x], fillType);
                    }
                }
            }
        };
        World.prototype.typeIsSet = function (block) {
            return block.type !== undefined && block.type !== null;
        };
        World.prototype.setType = function (block, type) {
            if (type == TerrainType.ocean) {
                block.bg = "#08c";
                block.type = TerrainType.ocean;
            }
            else if (type == TerrainType.shallow) {
                block.bg = "#0af";
                block.type = TerrainType.shallow;
            }
            else if (type == TerrainType.beach) {
                block.bg = "#eda";
                block.type = TerrainType.beach;
            }
            else if (type == TerrainType.grass) {
                block.bg = "#8c3";
                block.type = TerrainType.grass;
            }
            else if (type == TerrainType.dirt) {
                block.bg = "#a95";
                block.type = TerrainType.dirt;
            }
            else if (type == TerrainType.rock) {
                block.bg = "#aaa";
                block.type = TerrainType.rock;
            }
            else if (type == TerrainType.mountain) {
                block.bg = "#444";
                block.type = TerrainType.mountain;
            }
            else if (type == TerrainType.lava) {
                block.bg = "#600";
                block.type = TerrainType.lava;
            }
        };
        return World;
    }());
    exports.World = World;
    var Map = (function () {
        function Map(numX, numY, tileSize) {
            // sections are 25b x 25b
            this.bxps = 25;
            this.byps = 25;
            this.numX = numX;
            this.numY = numY;
            this.tileSize = tileSize;
            this.sectionsX = this.numX / this.bxps;
            this.sectionsY = this.numY / this.byps;
            this.pyps = this.byps * this.tileSize; // pixels y per section,
            this.pxps = this.bxps * this.tileSize; // pixels x per section
            this.objects = [];
            this.players = [];
        }
        Map.getSectionId = function (map, x, y, measurement) {
            if (measurement === "p") {
                return Math.floor(y / map.pyps) + "," + Math.floor(x / map.pxps);
            }
            else if (measurement === "b") {
                return Math.floor(y / map.byps) + "," + Math.floor(x / map.bxps);
            }
        };
        Map.addSprite = function (map, player) {
            var x = 400 + (Math.random() * 1600);
            var y = 400 + (Math.random() * 1600);
            player.sprite.x = x;
            player.sprite.y = y;
            map.players.push(player);
        };
        Map.distance = function (map, x1, x2, y1, y2) {
            return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        };
        Map.getBlock = function (map, x, y) {
            var yIndex = Math.floor(y / map.tileSize), xIndex = Math.floor(x / map.tileSize);
            return map.grid[yIndex][xIndex];
        };
        Map.blockBorders = function (map, block, terrain) {
            var surroundingBlocks = Map.getBlockSurroundingBlocks(map, block);
            for (var t in terrain) {
                var anyThisType = _.some(surroundingBlocks, function (b) {
                    return b.type === terrain[t];
                });
                if (anyThisType)
                    return true;
            }
            return false;
        };
        Map.getBlockSurroundingBlocks = function (map, block) {
            return Map.getSurroundingBlocks(map, block.x * map.tileSize, block.y * map.tileSize);
        };
        Map.getSurroundingBlocks = function (map, pixelsX, pixelsY) {
            var blocks = [], block = Map.getBlock(map, pixelsX, pixelsY), upperLeft = map.grid[block.y - 1][block.x - 1], above = map.grid[block.y - 1][block.x], upperRight = map.grid[block.y - 1][block.x + 1], left = map.grid[block.y][block.x - 1], right = map.grid[block.y][block.x + 1], lowerLeft = map.grid[block.y + 1][block.x - 1], below = map.grid[block.y + 1][block.x], lowerRight = map.grid[block.y + 1][block.x + 1];
            blocks.push(upperLeft);
            blocks.push(above);
            blocks.push(upperRight);
            blocks.push(left);
            blocks.push(block);
            blocks.push(right);
            blocks.push(lowerLeft);
            blocks.push(below);
            blocks.push(lowerRight);
            return blocks;
        };
        Map.getSurroundingSections = function (map, currSection) {
            var sy = parseInt(currSection.split(",")[0]), sx = parseInt(currSection.split(",")[1]), sections = [];
            sections.push(currSection);
            sections.push(sy + "," + (sx - 1));
            sections.push(sy + "," + (sx + 1));
            sections.push((sy - 1) + "," + sx);
            sections.push((sy - 1) + "," + (sx - 1));
            sections.push((sy - 1) + "," + (sx + 1));
            sections.push((sy + 1) + "," + sx);
            sections.push((sy + 1) + "," + (sx - 1));
            sections.push((sy + 1) + "," + (sx + 1));
            return sections;
        };
        Map.getBlocksObjects = function (map, blocks) {
            var objects = [];
            for (var b in blocks) {
                if (blocks[b]) {
                    for (var o in blocks[b].objects) {
                        objects.push(blocks[b].objects[o]);
                    }
                }
            }
            return objects;
        };
        Map.getNearbyPlayer = function (map, x, y, ignoreTeam) {
            var obj = this, players = _.filter(map.players, function (p) {
                var isEnemy = true, //p.team !== ignoreTeam,
                isCloseX = Math.abs(p.sprite.x - x) < 50, isCloseY = Math.abs(p.sprite.y - y) < 50;
                return isEnemy && isCloseX && isCloseY;
            });
            return players[0];
        };
        return Map;
    }());
    exports.Map = Map;
});
