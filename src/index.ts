import { v4 } from "uuid";

console.log("hello world");





type Race = "Ogre" | "Peon" | "Knight" | "Archer";
const characterCreationButton = document.getElementById("char-create")!;
const newCharNameInp = document.getElementById(
  "char-name"
)! as HTMLInputElement;
const newCharRaceInp = document.getElementById(
  "char-race"
)! as HTMLInputElement;


characterCreationButton.addEventListener("click", (element) => {
  element.preventDefault();
  const newCharName = newCharNameInp.value;
  const newCharRace = newCharRaceInp.value as Race;
  const newCharacter = RPGCharacter.createRPGCharacter(newCharName, newCharRace);
  console.log(newCharacter);
  if(newCharacter) {newCharacter.updateInventory(); console.log(newCharacter.inventory);}
  
});


















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
    public inventory: InventoryItem[] = RPGCharacter.createRPGItems()
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
      return new Archer(name);
    } else if (race === "Knight") {
      return new Knight(name);
    } else if (race === "Ogre") {
      return new Ogre(name);
    } else if (race === "Peon") {
      return new Peon(name);
    } else window.alert("Input invalid"); return null
  }

  inventoryHTMLElementInnerHTML() {
    const container = document.getElementById("inventory-container")
    for (const item of this.inventory) {
        const inventoryItemDiv = document.createElement("div")
        container!.appendChild(inventoryItemDiv)
        inventoryItemDiv.id = item.id
        inventoryItemDiv.className = item.name 
        inventoryItemDiv.innerHTML = `
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p>${item.value.toString()}</p>
        <button id="${item.name}">Delete All</button>
        <button id="${item.id}">Delete One</button>
        `
    }
  }

  showItemsInnerHTML() {
    const container = document.getElementById("shop")
    for (const item of this.inventory) {
        const inventoryItemDiv = document.createElement("div")
        container!.appendChild(inventoryItemDiv)
        inventoryItemDiv.id = item.id
        inventoryItemDiv.className = item.name 
        inventoryItemDiv.innerHTML = `
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p>${item.value.toString()}</p>
        <button id="${item.name}">Delete All</button>
        <button id="${item.id}">Delete One</button>
        `
    }
  }

  addRemoveElementListeners() {
    const buttons = document.querySelectorAll(".button");

    for (const button of buttons) {
      button.addEventListener("click", () => {
        // Do something here.
      });
}
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
      oneButton.addEventListener("click", (element) => {
        element.preventDefault();
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
      this.inventory = RPGCharacter.createRPGItems();
      this.inventoryHTMLElement()
    } else this.inventoryHTMLElement();
  }

  private static createRPGItems(): InventoryItem[] {
   return [
    new InventoryItem("Gold","A golden coin that gives off an otherworldly alure",1),
    new InventoryItem("Flail","A stick with four spiked ball and chain appendages attatched",7),
    new InventoryItem("Shield","A common wooden shield with a metal rim and dome in the center",15)
   ]
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
