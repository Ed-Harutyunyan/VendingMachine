const reader = require('readline-sync');
//const data = require('./products.json');
const VendingMachineFunctions = require('./script.js')
let jsr = new VendingMachineFunctions('./products.json')


console.log("Please enter an option (-increase- for staff only)");
const options = reader.question("list, exit: \n")

// So if you want to see the list of products this vending machine has, you write "list" and you get the names of products available.
// want to exit, well, type exit my friendcl

if (options === "list") {
    jsr.printProducts()
} else if (options === "exit") {
    return;
} else if (options === "increase") {
    let increasing = reader.questionInt("Please enter the products ID that you'd like to increase: ")
    // increasing === productId
    let count = reader.questionInt("Please enter the amount you'd like to increase: ")
    jsr.increaseQuantity(increasing, count)
    return;
}

//gives the product after asking what you want
let id = reader.questionInt("Please enter a products ID: ")

//validate the ID
if (!jsr.validateID(id)) {
    console.log(`Product under ID ${id} is not available `);
    return 
}

//If it the product is not available at that moment-->
if (!jsr.checkQuantity(id - 1)) {
    console.log(`This product is not available`);
    return
}

//If available -->
console.log(`Please insert coins that are acceptable:`)
jsr.printCoins()
console.log(`Your chosen product costs ${jsr.getPrice(id)}`)
let userCoin = reader.questionInt(`Please insert right amount of coins: `)

// let oddCoins = userCoin / 50
// if (oddCoins === )

jsr.buyProduct(id, userCoin)

function productGetter() {
    if (!jsr.checkQuantity(id - 1)) {
        jsr.decreaseQuantity(id)
        return;
    }
    jsr.decreaseQuantity(id)
    jsr.productDispenser(id)
    return;
}


setTimeout(productGetter, 1000)

