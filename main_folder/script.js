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

            console.log(`Your change: \n${change}`);
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

    // validateProduct(newProduct) {

    //     if (Object.keys(newProduct).length != 4 || typeof newProduct.id != 'number'
    //         || typeof newProduct.price != 'number' || typeof newProduct.quantity != 'number')
    //         return false;

    //     for (let product of this.data.products)
    //         if (product.id == newProduct.id)
    //             return false;

    //     return true;
    // }

    validateID(productId) {
        for (let product of this.data.products)
            if (product.id == productId)
                return true;

        return false;
    }
}