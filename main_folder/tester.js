const reader = require('readline-sync');
const data = require('./products.json');


const options = reader.question("Please enter an option: ")

// So if you want to see the list of products this vending machine has, you write "list" and you get the names of products available.
//Later when figure out the way to print the names, will also add the prices 

 if (options == "list") {
        console.table(data.products)
}

let chosenProductByCustomer = reader.question("Please enter a products name: ")

if (chosenProductByCustomer == "Coca Cola") {
    console.log(`Here's your ${chosenProductByCustomer} 🧃`);
} else if (chosenProductByCustomer == "Water") {
    console.log(`Here's your ${chosenProductByCustomer} 💧`);
} else if (chosenProductByCustomer == "Snickers") {
    console.log(`Here's your ${chosenProductByCustomer} 🍫`);
} else {
    console.log(`Here's your ${chosenProductByCustomer}`);
}