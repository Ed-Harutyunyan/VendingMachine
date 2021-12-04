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

    // response or callback (cb)
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

    get getDataProduct() {
        return this.data.products
    }

    getProduct(productId) {
        return this.data.products[productId]
    }

    setProduct(productId, product) {
        this.data.products[productId] = product
    }

    getName(productId) {
        return this.data.products[productId].name
    }

    setName(productId, name) {
        this.data.products[productId].name = name
    }

    getPrice(productId) {
        return this.data.products[productId].price
    }

    setPrice(productId, price) {
        return this.data.products[productId].price = price
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

        if (!this.validateQuantity(productId - 1)) {
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

        // invalid payment case
        if (userMoney < this.data.products[productId].price) {
            console.log('Invalid payment. Try again!')
            
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

    getProduct(productId) {

        if (productId == 1) {
            console.log(`Here's your Coca Cola 🧃`);
        } else if (productId == 2) {
            console.log(`Here's your Water 💧`);
        } else if (productId == 3) {
            console.log(`Here's your Snickers Bar 🍫`);
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

    insertProduct(product) {

        if (!this.validateProduct(product)) {
            console.log('Invalid entered product. Try again.')
            return
        }

        this.data.products[product.id] = product

        this.jsonReader(this.url, (err, item) => {

            if (err) {
                console.log('Some error appers: ', err)
                return
            }

            item.products[product.id] = product
            fs.writeFileSync(this.url, JSON.stringify(item));
        })

    }

    // inserts null in place of removed object
    deleteProduct(productID) {

        if (!this.validateID(productID)) {
            console.log("Product with the mentioned ID does not exist!")
            return
        }

        delete this.data.products[productID]

        this.jsonReader(this.url, (err, item) => {

            if (err) {
                console.log('Some error appers: ', err)
                return
            }

            delete item.products[productID]
            fs.writeFileSync(this.url, JSON.stringify(item));
        })

    }



    validateQuantity(productId) {
        if (this.getQuantity(productId) == 0)
            return false
        return true
    }

    validateProduct(newProduct) {

        if (Object.keys(newProduct).length != 4 || typeof newProduct.id != 'number'
            || typeof newProduct.price != 'number' || typeof newProduct.quantity != 'number')
            return false

        for (let product of this.data.products)
            if (product.id == newProduct.id)
                return false
        return true
    }

    validateID(productID) {
        for (let product of this.data.products)
            if (product.id == productID)
                return true
        return false
    }
}