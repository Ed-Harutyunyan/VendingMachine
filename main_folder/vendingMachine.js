const reader = require('readline-sync');
//const data = require('./products.json');
const VendingMachineWorker = require('./script.js')
let jsr = new VendingMachineWorker('./products.json')


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

    function productGetter() {
        jsr.decreaseQuantity(id)
        jsr.getProduct(id)
        return;
    } 
    
    setTimeout(productGetter, 1000)

