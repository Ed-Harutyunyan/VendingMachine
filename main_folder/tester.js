const reader = require('readline-sync');
const data = require('./products.json');


const options = reader.question("Please enter an option: ")

// So if you want to see the list of products this vending machine has, you write "list" and you get the names of products available.
//Later when figure out the way to print the names, will also add the prices 

 if (options == "list") {
    for (let i = 0; i < data.products.length; i++) {
        console.log(JSON.stringify(data['products'][i]['id']) + "\t" + JSON.stringify(data['products'][i]['name']) + "\t" + JSON.stringify(data['products'][i]['price'])) + "\n"
    }
}