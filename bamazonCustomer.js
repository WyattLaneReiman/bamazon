
// Connects JS to SQL query.
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "wyatt123",
    database: "bamazon"
});
// alerts user of their ID when connected to SQL and calls nextConnection function
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    nextConnection();
});
// neatly displays product table from SQL and calls promptUserPurchase
function nextConnection() {
    querySQL = 'SELECT * FROM products';

    connection.query(querySQL, function (err, res) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var strOut = '';
        for (var i = 0; i < res.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + res[i].item_id + '  //  ';
            strOut += 'Product Name: ' + res[i].product_name + '  //  ';
            strOut += 'Department: ' + res[i].department_name + '  //  ';
            strOut += 'Price: $' + res[i].price + '\n';

            console.log(strOut);
        }

        console.log("-----------------------------------------------------------------------\n");

        promptUserPurchase();
    });
}
// Validates user input on prompts
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}
//Prompts user to choose a product by ID from the displayed information 
function promptUserPurchase() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: validateInput,
            filter: Number
        }

        //Then validates user input 
    ]).then(function (input) {
        var item = input.item_id;

        var quantity = input.quantity;

        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                nextConnection();

            } else {
                var productData = data[0];
                // Assures user that their order went through
                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');
                    console.log("---------------------------------------------------------------------------------\n")
                    //Updates your stock quantity
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        connection.end();
                    });

                    // or not...
                } else {
                    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    nextConnection();
                }
            }
        });
    });
}
