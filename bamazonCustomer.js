//requre mysql to make use of it for the application.
var request = require("request");
var mySQL = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

//stashing the connection informatin in variables for easy & fast adjustment later.
var dbHost = "localhost";
var dbPort = 3306;
var dbUser = "root";
var dbPassword = process.env.MYSQL_PASSWORD;
var dbDatabase = "bamazondb";

//connect to the DB and press the information up to the database.
var connection = mySQL.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
});

//throw an error if the DBA doesn't exist.
connection.connect(function(error) {
    if (error) throw error;
    console.log("connected as ID " + connection.threadId);
    initialConnection();
});

//display the list from the DBA for the user
function initialConnection() {
    connection.query("SELECT * FROM products", function(error, result) {
        if (error) throw error;

        for (var i = 0; i < result.length; i++) {
            console.log(result[i].item_id + " | " + result[i].product_name +
                " | $" + result[i].price);
        }
        openingQuestions();
        // connection.end();
    });
};

function openingQuestions() {
    //prompt the user - Which ID they wish to buy from the list displayed
    inquirer
        .prompt([{
                name: "item_id",
                type: "input",
                message: "Please enter the id # of the item you would like to purchase.",
                choices: ["id"],
                //validate the ID entered is a valid choice.
                validate: function(value) {
                    return isNumValue(value);
                }
            },
            //ask the user how many of that item they would like to buy
            {
                name: "itemCount",
                type: "input",
                message: "How many of this item would you like to purchase?",
                validate: function(value) { return isNumValue(value); }
            }
        ])
        .then(function(answer) {
            //check to see if there is enough of the selected item.
            isIDValid(answer);
        })
}

/* Once the customer has placed the order, your application should check if
    your store has enough of the product to meet the customer's request.

    If not, the app should log a phrase like Insufficient quantity!, and then 
    prevent the order from going through.

    However, if your store does have enough of the product, you should fulfill 
    the customer's order.

    This means updating the SQL database to reflect the remaining quantity.
    Once the update goes through, show the customer the total cost of their 
    purchase. */

//control/validation functions
function isNumValue(value) {
    if (isNaN(value) === false) {
        return true;
    }
    return "not valid, enter a number.";
    return false;
};

function isIDValid(answer) {
    //check to see if the id entered is one on the list.
    connection.query(
        "SELECT COUNT(*) cnt FROM bamazondb.products WHERE Item_id = " + answer.item_id,
        function(error, result) {
            if (error) throw error;
            console.log("I found " + result[0].cnt);
            if (result[0].cnt === 0) {
                console.log("that ID does not exist, please try again");
                openingQuestions();
                return;
            }
            isItemsInStock(answer);
        }
    )
}

function isItemsInStock(answer) {
    //check to see if the item is in stock

    connection.query(
        "SELECT stock_quantity FROM bamazondb.products where item_id = " + answer.item_id,
        function(error, result) {
            if (error) throw error;
            if (answer.itemCount <= result.stock_quantity) {
                purchaseProduct(answer);
            } else {
                console.log("Sorry, we don't have enough of that product, please try again")
                openingQuestions();
            }

        }
    )
}