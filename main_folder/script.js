const fs = require('fs');


module.exports = class VendingMachineWorker {

    constructor(dataURL) {
        this.url = dataURL;
        this.data = require(dataURL);
        this.machineMoney = [
            50, 50, 50, 50, 50,
            100, 100, 100, 100, 100,
            200, 200, 200, 200, 200,
            500, 500, 500, 500, 500
        ]
    }

    jsonReader(filePath, response) {
        fs.readFile(filePath, (err, fileData) => {

            if (err)
                return response && response(err)

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

        this.jsonReader(this.url, (err, item) => {

            if (err) {
                console.log('Some error appers: ', err)
                return
            }

            item.products[productId - 1].quantity -= 1
            fs.writeFileSync(this.url, JSON.stringify(item));
        })
    }

    buyProduct(productId, userMoney) {
        let userInput = 0
        // invalid payment case
        if (userMoney < this.data.products[productId].price) {
            while(userMoney < this.data.products[productId].price) {
            console.log(`Not the right amount please insert ${this.data.products[productId].price - userMoney} more`) 
            userInput + userMoney
            return;
            }
        }

        // need to pay change and product
        if (userMoney > this.data.products[productId].price) {

            let difference = userMoney - this.data.products[productId].price
            let change = 0

            for (let coin in this.machineMoney) {
                if (coin <= difference && difference > 0) {
                    difference -= coin
                    change += coin
                }

                if (difference == 0)
                    return change
            }
        }

        // does not need to pay change
        if (userMoney === this.data.products[productId].price) {
            return;
        }
    }

    productDispenser(productId) {

        if (productId == 1) {
            console.log(`Here's your ${this.getName(productId - 1)} 🧃`);
        } else if (productId == 2) {
            console.log(`Here's your ${this.getName(productId - 1)} 💧`);
        } else if (productId == 3) {
            console.log(`Here's your ${this.getName(productId - 1)} Bar 🍫`);
        } else {
            console.log(`Sorry Magical Vending Machine doesn't have a product under that ID please enter another ID`);
        }
    }

    increaseQuantity(productId, num) {

        this.setQuantity(productId - 1, this.getQuantity(productId - 1) + num)

        this.jsonReader(this.url, (err, item) => {

            if (err) {
                console.log('Some error appers: ', err)
                return
            }

            item.products[productId - 1].quantity += num
            fs.writeFileSync(this.url, JSON.stringify(item));
        })
    }

    checkQuantity(productId) {
        if (this.getQuantity(productId) == 0)
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

    // validateID(productId) {
    //     for (let product of this.data.products)
    //         if (product.id == productId)
    //             return true;

    //     return false;
    // }
}