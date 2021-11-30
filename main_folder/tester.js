const reader = require('readline-sync');
const data = require('./products.json');


const options = reader.question("Please enter an option: ")

const names = Object.data(products)

console.log(data.products[names].name)


// So if you want to see the list of products this vending machine has, you write "list" and you get the names of products available.
//Later when figure out the way to print the names, will also add the prices 

 if (options == "list") {
    let result
    for (let i = 0; i < data.length; i++) {
        result += data.products[i].name
    }
    console.log(result);
}