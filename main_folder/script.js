const fs = require('fs');

class JSONReader {

    constructor(dataURL) {
        this.url = dataURL;
        this.data = require(dataURL);
    }

    printData() {
        console.table(this.data.products)
    }

    jsonReader(filePath, cb) {
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                return cb && cb(err)
            }
            try {
                const object = JSON.parse(fileData)
                return cb && cb(null, object)
            } catch(err) {
                return cb && cb(err)
            }
        })
    }

    decreaseItemQuantity(id) {

        this.jsonReader(this.url, (err, item) => {
            if (err) {
                console.log('Error reading file:', err)
                return
            }

            --item.products[id].quantity
            --this.data.products[id].quantity

            fs.writeFile(this.url, JSON.stringify(item), (err) => {
                if (err) console.log('Error writing file:', err)
            })
        })
    }

}


// let jsr = new JSONReader('./products.json');
// jsr.printData();
// jsr.decreaseItemQuantity(0);
// jsr.printData();
