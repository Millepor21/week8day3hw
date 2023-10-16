function inventoryHTMLElementInnerHTML() {
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

function showItemsInnerHTML() {
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