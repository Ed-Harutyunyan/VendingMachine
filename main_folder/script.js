const fs = require('fs');
const reader = require('readline-sync')


module.exports = class VendingMachineFunctions {

    constructor(dataLoc) {
        this.loc = dataLoc;
        this.data = require(dataLoc);
    }

    jsonReader(filePath, response) {
        fs.readFile(filePath, (err, fileData) => {

            //if syntax error
            if (err)
                return response && response(err)
            //if runtime error
            try {
                const object = JSON.parse(fileData)
                return response && response(null, object)
            } catch (err) {
                return response && response(err)
            }
        })
    }

    productDispenser(productId) {
        return this.data.products[productId]
    }

    getName(productId) {
        return this.data.products[productId].name
    }

    getPrice(productId) {
        return this.data.products[productId - 1].price
    }

    getQuantity(productId) {
        return this.data.products[productId].quantity
    }

    setQuantity(productId, quantity) {
        this.data.products[productId].quantity = quantity
    }

    printProducts() {
        console.table(this.data.products)
    }

    printCoins() {
        console.table(this.data.money)
    }

    decreaseQuantity(productId) {

        if (!this.checkQuantity(productId - 1)) {
            console.log('The following product does not exist. Try something else')
            return
        }

        this.setQuantity(productId - 1, this.getQuantity(productId - 1) - 1)

        //updates JSON/decrase item quantity in JSON
        this.jsonReader(this.loc, (err, item) => {
            
            //if runtime error
            if (err) {
                console.log('Some error: ', err)
                return
            }

            item.products[productId - 1].quantity -= 1
            fs.writeFileSync(this.loc, JSON.stringify(item));
        })
    }

    buyProduct(productId, userMoney) {
        // invalid payment case

        if (userMoney < this.data.products[productId - 1].price) {
            const leftoverCoins = reader.questionInt(`Not the right amount please insert ${this.data.products[productId - 1].price - userMoney} more: `)
            this.buyProduct(productId, userMoney + leftoverCoins)
            return;
        }

        // need to pay change and product
        if (userMoney > this.data.products[productId - 1].price) {
            let change = userMoney - this.data.products[productId - 1].price
            this.getChange(change)
            return;
        }

        // does not need to pay change
        if (userMoney === this.data.products[productId - 1].price) {
            return;
        }
    }

    productDispenser(productId) {

        if (productId === 1) {
            console.log(`Here's your ${this.getName(productId - 1)} 🧃`);
        } else if (productId === 2) {
            console.log(`Here's your ${this.getName(productId - 1)} 💧`);
        } else if (productId === 3) {
            console.log(`Here's your ${this.getName(productId - 1)} Bar 🍫`);
        } else {
            console.log(`Sorry Magical Vending Machine doesn't have a product under that ID please enter another ID`);
        }
    }

    increaseQuantity(productId, num) {

        this.setQuantity(productId - 1, this.getQuantity(productId - 1) + num)

        console.log(`Products' quantity increased successfully`);

        this.jsonReader(this.loc, (err, item) => {

            if (err) {
                console.log('Some error appears: ', err)
                return
            }

            item.products[productId - 1].quantity += num
            fs.writeFileSync(this.loc, JSON.stringify(item));
        })
    }

    checkQuantity(productId) {
        if (this.getQuantity(productId) === 0)
            return false;

        return true;
    }
    
    getChange(amountOfChange) {
        let changes = [50, 100, 200, 300]
        let result = []

        while (amountOfChange > 0) {
            let coins = changes.pop()
            let count = Math.floor(amountOfChange/coins)
            amountOfChange -= count * coins
            if (count) {
                result.push(coins)
            }
        }
        
        console.log(`Here's your change: \n${result}`)
    }

    // userCoinAdd (userCoin) {

    //     if (userCoin === 50) {
    //         this.data.money[0].quantity =+ 1
    //     } else if (userCoin === 100) {
    //         this.data.money[1].quantity += 1
    //     } else if (userCoin === 200) {
    //         this.data.money[2].quantity += 1
    //     } else if (userCoin === 500) {
    //         this.data.money[3].quantity += 1
    //     }
    // }

    validateID(productId) {
        for (let product of this.data.products)
            if (product.id == productId)
                return true;

        return false;
    }
}