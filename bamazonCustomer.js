const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "starr801",
    database: "bamazonDB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Thank you for using Bamazon!`);
    bamazonPrompt();
});

function bamazonPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: `What would you like to do?`,
            choices: [
                "View All Inventory",
                "View Inventory by Department",
                "Shop",
                "Goodbye!"
            ],
            name: "userChoice"
        }
    ])
        .then((data) => {
            if (data.userChoice === "View All Inventory") {
                viewAllInventory();
            } else if (data.userChoice === "View Inventory by Department") {
                inventoryByDepart();
            } else if (data.userChoice === "Shop") {
                shopper();
            } else {
                killProgram();
            }
        })
}

function viewAllInventory() {
    connection.query("SELECT * FROM products",
        (err, res) => {
            makeItLookNice(res);
            continueInq();
        })
}

function inventoryByDepart() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which department would you like to look at?",
            choices: [
                "Electronics",
                "Music",
                "Clothing & Accesories",
                "Furniture",
                "Food & Beverage",
                "Return to Previous Screen"
            ],
            name: "departChoice"
        }
    ])
        .then((data) => {
            if (data.departChoice === "Return to Previous Screen") {
                bamazonPrompt();
            } else {
                connection.query(`SELECT * FROM products WHERE ?`, {
                    department_name: data.departChoice
                }, (err, res) => {
                    console.log(`Loading all items in ${data.departChoice}...............
`);
                    makeItLookNice(res);
                    continueInq();
                })
            }
        })
}

function shopper() {
    inquirer.prompt([
        {
            type: `input`,
            message: `Input the Product ID # of the item you'd like to purchase`,
            name: `productID`,
        },
        {
            type: `input`,
            message: `How many would you like to purchase?`,
            name: `quantity`
        }
    ])
        .then((data) => {
            const quantity = data.quantity;
            connection.query(`SELECT * FROM products WHERE ?`, { item_id: data.productID }, (err, res) => {
                if (err) throw err;
                if (res.length === 0) {
                    console.log(`ERM, Couldn't find an item with that ID. Sorry about that`);
                    continueInq();
                } else {
                    const productInfo = res[0];
                    console.log(`
You've chosen to buy ${data.quantity} of the ${productInfo.product_name}
`)
                    if (quantity <= productInfo.stock_quantity) {
                        connection.query(`UPDATE products SET ? WHERE ?`, [
                            {
                                stock_quantity: productInfo.stock_quantity - quantity
                            },
                            {
                                item_id: data.productID
                            }], (err, res) => {
                                if (err) throw err;
                                const totalPrice = (productInfo.price * quantity);
                                console.log(`
Thank you! Your total is $${totalPrice}. Thank you for using Bamazon!
`);
                                continueInq();
                            })
                    } else {
                        console.log(`Darn! It seems ${productInfo.product_name} is out of stock!`)
                        continueInq();
                    }
                }
            })
        })
}

function makeItLookNice(data) {
    for (let i = 0; i < data.length; i++) {
        let { item_id, product_name, department_name, price } = data[i];
        console.log(`
===============================================================================================
Product ID#: ${item_id} | ${product_name} | ${department_name} | $${price}
===============================================================================================
`)
    }
}

function continueInq() {
    inquirer.prompt([
        {
            type: "list",
            message: "Is there anything else you would like to do?",
            choices: ["Yes", "No"],
            name: "continue"
        }
    ])
        .then((data) => {
            if (data.continue === "Yes") {
                bamazonPrompt();
            } else {
                killProgram();
            }
        })
}

function killProgram() {
    console.log(`
Thank you for using Bamazon! Have a great day!`);
    connection.end();
}
