"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
function createCharacter(name, archtype, fightingStyle) {
    var uuid = (0, uuid_1.v4)();
    return { id: uuid, name: name, archtype: archtype, fightingStyle: fightingStyle, inventory: [] };
}
function createInventoryItem(name, description, value, damage, defense) {
    if (damage === void 0) { damage = 0; }
    if (defense === void 0) { defense = 0; }
    var uuid = (0, uuid_1.v4)();
    var parameterDef = 0;
    var parameterDam = 0;
    if (damage > 1) {
        parameterDam = damage;
    }
    else if (defense > 1) {
        parameterDef = defense;
    }
    else {
        console.log('Error, either a defense or damage value is required');
    }
    return { id: uuid, name: name, description: description, value: value, defense: parameterDef, damage: parameterDam };
}
function addToInventory(anItem, aCharacter) {
    aCharacter.inventory.push(anItem);
}
function removeFromInventory(anItem, aCharacter) {
    aCharacter.inventory = aCharacter.inventory.filter(function (object) { return object !== anItem; });
}
function removeQuantityFromInventory(anItem, aCharacter, quantity) {
    for (var i = 0; i < quantity; i++) {
        var index = aCharacter.inventory.indexOf(anItem);
        aCharacter.inventory.splice(index, 1);
    }
}
function inventoryValue(aCharacter) {
    var totalValue = 0;
    for (var _i = 0, _a = aCharacter.inventory; _i < _a.length; _i++) {
        var item = _a[_i];
        totalValue += item.value;
    }
    return totalValue;
}
function printInventory(aCharacter) {
    console.table(aCharacter.inventory);
}
var char1 = createCharacter("Harn", "light", "melee");
var Sword = createInventoryItem("Lerth", "A magical sword of the ogre tribe that goes to the strongest of the current generation", 20, 12, 0);
var Bow = createInventoryItem("Storm", "A legendary bow with the force of the wind behind each shot", 10, 15, 0);
var Armor = createInventoryItem("Iron Hold", "Unusually large Armor created by...for Harn the strongest of the current generation", 30, 0, 40);
addToInventory(Sword, char1);
printInventory(char1);
inventoryValue(char1);
