const reader = require('readline-sync');
const data = require('./products.json');
const fs = require('fs');
const jsr = require('./script')
let crud = JSONReader('./products.json')

console.log("Please enter an option");
const options = reader.question("list, exit: \n")

// So if you want to see the list of products this vending machine has, you write "list" and you get the names of products available.
// want to exit, well, type exit my friendcl

if (options === "list") {
    console.table(data.products)
} else if (options === "exit") {
    return;
}

//gives the product after asking what you want
let chosenProductByCustomer = reader.question("Please enter a products name: ")


function giveNeededProduct () {

    if (chosenProductByCustomer == "Coca Cola") {
        console.log(`Here's your ${chosenProductByCustomer} 🧃`);
    } else if (chosenProductByCustomer == "Water") {
        console.log(`Here's your ${chosenProductByCustomer} 💧`);
    } else if (chosenProductByCustomer == "Snickers") {
        console.log(`Here's your ${chosenProductByCustomer} 🍫`);
    } else {
        console.log(`Sorry Magical Vending Machine doesn't have ${chosenProductByCustomer} please enter something else`);

    }
}

setTimeout(giveNeededProduct, 1000, chosenProductByCustomer)
