# Bamazon

Bamazon is a command based app that uses node and a database created using MySQL. In this app, You can view the inventory that is stored in a SQL database and "purchase" items that you would like.

# Setup

1. Clone Repository
2. Install the package.json with the command 'npm install'
3. Run the project folder on Node

# How to use
You will be greeted with an inquirer prompt when you first run the program asking you 4 things:

1. View all Inventory
2. View inventory by Department
3. Shop
4. Goodbye!

"View All Inventory" simply shows the entire database showing product ID, Name, Price, and Department.

"View Inventory by Department" displays items just like View All except you can view certain things by department.

"Shop" will ask you to input the Product ID and how many of what you would like to purchase. If the sale is successful, the database will change accordingly (i.e. The stock will lower). If a user attempts to purchase an out of stock item, the App will let them know.

After every instance, a prompt will come up asking if there is anything else you would like to do. If yes is chosen, the app will re run. If no, the app will thank you can prompty end.

# Link to demo video

[Link to Demo video](https://drive.google.com/file/d/1ecMcw4-ZNsEI1HvSBw4bUp1JYMSYJU5A/view)

# Technologies Used

1. MySQL
2. Node
3. Javascript
4. Inquirer