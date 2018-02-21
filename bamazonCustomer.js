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

/*Running this application will first display all of the items available for
    sale. Include the ids, names, and prices of products for sale.
    * The app should then prompt users with two messages.
    * The first should ask them the ID of the product they would like to buy.
    * The second message should ask how many units of the product they would like to buy. */

function initialConnection() {
    connection.query("SELECT * FROM products", function(error, result) {
        if (error) throw error;

        for (var i = 0; i < result.length; i++) {
            console.log(result[i].item_id + " | " + result[i].product_name +
                " | $" + result[i].price);
        }
    });

    //prompt the user - Which ID they wish to buy
    inquirer
        .prompt({
            name: "item",
            type: "input",
            message: "Please enter the id # of the item you would like to purchase.",
            choices: ["id"],
        })
        .then(function(answer) {
            isNumValue(value);
        })
};

//control/validation functions
function isNumValue(value) {
    if (isNan(value) === false) {
        return true;
    }
    return false;
}