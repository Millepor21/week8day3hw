import { v4 } from 'uuid';

type InventoryItem = {
    id: string
    name: string
    description: string
    value: number
}

interface Armor extends InventoryItem {
    defense: number
}

interface Weapon extends InventoryItem {
    damage: number
}

type RPGCharacter = {
    id: string
    name: string
    archtype: string
    fightingStyle: "ranged" | "melee"
    inventory: InventoryItem[]
}

function createCharacter(name: string, archtype: string, fightingStyle: "ranged"|"melee"):RPGCharacter{
    const uuid = v4();
    return {id: uuid,name,archtype,fightingStyle,inventory:[]}
}

function createInventoryItem(name: string, description: string, value: number, damage: number = 0, defense: number = 0):Weapon|Armor{
    const uuid = v4();
    let parameterDef = 0
    let parameterDam = 0
    if(damage > 1){
        parameterDam = damage
    } else if (defense > 1){
        parameterDef = defense
    } else {
        console.log('Error, either a defense or damage value is required');
    }
    return {id: uuid, name: name, description: description, value: value,defense: parameterDef,damage: parameterDam}
}

function addToInventory(anItem: Weapon|Armor, aCharacter: RPGCharacter):void{
    aCharacter.inventory.push(anItem)
}

function removeFromInventory(anItem: InventoryItem,aCharacter: RPGCharacter):void{
    aCharacter.inventory = aCharacter.inventory.filter(object => object !== anItem)
}

function removeQuantityFromInventory(anItem: InventoryItem,aCharacter: RPGCharacter,quantity: number):void{
    for(let i = 0; i < quantity; i ++){
        const index = aCharacter.inventory.indexOf(anItem)
        aCharacter.inventory.splice(index,1)
    }
}

function inventoryValue(aCharacter: RPGCharacter):number{
    let totalValue = 0
    for(const item of aCharacter.inventory){
        totalValue += item.value
    }
    return totalValue
}

function printInventory(aCharacter: RPGCharacter):void{
    console.table(aCharacter.inventory)
}

const char1 = createCharacter("Harn","light","melee")
const Sword = createInventoryItem("Lerth","A magical sword of the ogre tribe that goes to the strongest of the current generation",20,12,0)
const Bow = createInventoryItem("Storm","A legendary bow with the force of the wind behind each shot",10,15,0)
const Club = createInventoryItem("Bat","Hits harder than usual",10,8,0)
const Armor = createInventoryItem("Iron Hold","Unusually large Armor created by...for Harn the strongest of the current generation",30,0,40)

addToInventory(Sword,char1)
printInventory(char1)
inventoryValue(char1)

addToInventory(Bow,char1)
printInventory(char1)
inventoryValue(char1)

addToInventory(Club,char1)
printInventory(char1)
inventoryValue(char1)

addToInventory(Armor,char1)
printInventory(char1)
inventoryValue(char1)

removeFromInventory(Sword,char1)
printInventory(char1)
inventoryValue(char1)

addToInventory(Club,char1)
removeQuantityFromInventory(Club,char1,2)
printInventory(char1)
inventoryValue(char1)