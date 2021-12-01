const reader = require('readline-sync');
const data = require('./products.json');


const options = reader.question("Please enter an option: ")

// So if you want to see the list of products this vending machine has, you write "list" and you get the names of products available.

 if (options == "list") {
        console.table(data.products)
}

//gives the product after asking what you want
let chosenProductByCustomer = reader.question("Please enter a products name: ")

function giveNeededProduct (val) {

    if (chosenProductByCustomer == "Coca Cola") {
        console.log(`Here's your ${chosenProductByCustomer} 🧃`);
    } else if (chosenProductByCustomer == "Water") {
        console.log(`Here's your ${chosenProductByCustomer} 💧`);
    } else if (chosenProductByCustomer == "Snickers") {
        console.log(`Here's your ${chosenProductByCustomer} 🍫`);
    } else {
        console.log(`Here's your ${chosenProductByCustomer}`);
    }
}

setTimeout(giveNeededProduct(chosenProductByCustomer), 1000)