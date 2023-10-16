import { v4 } from "uuid";

console.log("hello world");
type Race = "Ogre"|"Peon"|"Knight"|"Archer"
const characterCreationButton = document.getElementById('char-create')!
const newCharNameInp = document.getElementById('char-name')! as HTMLInputElement
const newCharRaceInp = document.getElementById('char-race')! as HTMLInputElement
characterCreationButton!.addEventListener('click',()=>{
    const newCharName = newCharNameInp.value
    const newCharRace = newCharRaceInp.value as Race
    RPGCharacter.createRPGCharacter(newCharName, newCharRace)
})

interface IAttack {
  attack(): void;
}

interface IDefence {
  defend(): void;
}

class ClubAttack implements IAttack {
  attack(): void {
    console.log("Attacking with a Club");
  }
}

class BowAttack implements IAttack {
  attack(): void {
    console.log("Attacking with a Bow");
  }
}

class SwordAttack implements IAttack {
  attack(): void {
    console.log("Attacking with a Sword");
  }
}

class TunicDefence implements IDefence {
  defend(): void {
    console.log("Defending with a Tunic");
  }
}

class ArmorDefence implements IDefence {
  defend(): void {
    console.log("Defending with Armor");
  }
}

class ShieldDefence implements IDefence {
  defend(): void {
    console.log("Defending with a Shield");
  }
}

abstract class RPGCharacter {
  constructor(
    private attackMechanic: IAttack,
    private defenceMechanic: IDefence,
    public inventory: InventoryItem[] = []
  ) {}

  attack(): void {
    this.attackMechanic.attack();
  }

  defend(): void {
    this.defenceMechanic.defend();
  }

  collectGold(): void {
    console.log("Collecting gold");
  }

  changeStyle(attackMechanic: IAttack, defenceMechanic: IDefence): void {
    this.attackMechanic = attackMechanic;
    this.defenceMechanic = defenceMechanic;
    console.log("Changed Fighting Style");
  }

  static createRPGCharacter(
    name: string,
    race: "Ogre" | "Peon" | "Knight" | "Archer"
  ) {
    console.log(race);
    if (race === "Archer") {
      const newChar = new Archer(name);
      newChar.inventoryHTMLElement()
      newChar.showItems()
    } else if (race === "Knight") {
      const newChar = new Knight(name);
      newChar.inventoryHTMLElement()
      newChar.showItems()
    } else if (race === "Ogre") {
      const newChar = new Ogre(name);
      newChar.inventoryHTMLElement()
      newChar.showItems()
    } else if (race === "Peon") {
      const newChar = new Peon(name);
      newChar.inventoryHTMLElement()
      newChar.showItems()
    } else window.alert("Input invalid")
  }

  inventoryHTMLElement() {
    const container = document.getElementById("inventory-container")!;
    for (const item of this.inventory) {
      const inventoryItem = document.createElement("div");
      container.appendChild(inventoryItem);
      inventoryItem.id = item.id;
      inventoryItem.className = item.name;
      const name = document.createElement("h2");
      inventoryItem.appendChild(name);
      name.innerText = item.name;
      const description = document.createElement("p");
      inventoryItem.appendChild(description);
      description.innerText = item.description;
      const value = document.createElement("p");
      inventoryItem.appendChild(value);
      value.innerText = item.value.toString();
      const allButton = document.createElement("button");
      inventoryItem.appendChild(allButton);
      allButton.innerText = "Delete All";
      allButton.id = item.name;
      allButton.addEventListener("click", () => {
        const parentElementClassName = allButton.parentElement!.className;
        const elementsToDelete = container.getElementsByClassName(
          parentElementClassName
        );
        for (const element of elementsToDelete) {
          element.remove();
        }
      });
      const oneButton = document.createElement("button");
      inventoryItem.appendChild(oneButton);
      oneButton.innerText = "Delete One";
      oneButton.id = item.id;
      oneButton.addEventListener("click", () => {
        oneButton.parentElement!.remove();
      });
    }
  }

  showItems() {
    const container = document.getElementById("shop")!;
    for (const item of this.inventory) {
      const inventoryItem = document.createElement("div");
      container.appendChild(inventoryItem);
      inventoryItem.id = item.id;
      inventoryItem.className = item.name;
      const name = document.createElement("h2");
      inventoryItem.appendChild(name);
      name.innerText = item.name;
      const description = document.createElement("p");
      inventoryItem.appendChild(description);
      description.innerText = item.description;
      const value = document.createElement("p");
      inventoryItem.appendChild(value);
      value.innerText = item.value.toString();
    }
  }

  updateInventory() {
    if (this.inventory.length === 0) {
      window.alert("No items in Inventory");
      RPGCharacter.createRPGItems()
    } else this.inventoryHTMLElement();
  }

  static createRPGItems(): InventoryItem[] {
    const newItem = new InventoryItem("gold","A shiny round coin with a strange glow",1)
    return [newItem]
  }
}

class Ogre extends RPGCharacter {
  constructor(private name: string) {
    super(new ClubAttack(), new ShieldDefence());
    this.name = name;
  }
}
class Knight extends RPGCharacter {
  constructor(private name: string) {
    super(new SwordAttack(), new ArmorDefence());
    this.name = name;
  }
}
class Peon extends RPGCharacter {
  constructor(private name: string) {
    super(new ClubAttack(), new ShieldDefence());
    this.name = name;
  }
}
class Archer extends RPGCharacter {
  constructor(private name: string) {
    super(new BowAttack(), new TunicDefence());
    this.name = name;
  }
}

class InventoryItem {
  id: string;
  name: string;
  description: string;
  value: number;
  constructor(name: string, description: string, value: number) {
    this.id = v4();
    this.name = name;
    this.value = value;
    this.description = description;
  }
}
