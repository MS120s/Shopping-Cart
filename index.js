import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-dd610-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "ShoppingList")
const booksListInDB = ref(database, "Books")

const buttonEl = document.getElementById("add-button")
const inputEl = document.getElementById("input-field")
const shopListEl = document.getElementById("shopping-list")

// refactor codes
function cler(a) {
     return a.value = ""
}

function appendList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shopListEl.append(newEl)

    newEl.addEventListener("click", function(){
        let exactLocation = ref(database, `ShoppingList/${itemID}`)
        remove(exactLocation)
    })
    
}

function clearData(data){
    data.innerHTML = ""
}


buttonEl.addEventListener("click", function(){
    let inputValue = inputEl.value
    push(shoppingListInDB, inputValue)
    cler(inputEl)

})

onValue(shoppingListInDB, function(snapshot){
    if (snapshot.exists()){
        let shopListArray = Object.entries(snapshot.val())
        clearData(shopListEl)

        for (let i = 0; i < shopListArray.length; i++) {
            let shopList = shopListArray[i]

            let shopListID = shopList[0]
            let shopListValues = shopList[1]

            appendList(shopList)
    }
    } else{
        shopListEl.innerHTML = "No items here... yet"
    }
    
    

})  
