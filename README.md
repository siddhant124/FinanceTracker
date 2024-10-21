# Expense Tracker Application

## Project Setup

1. Clone this repository or download the zip file.
2. Navigate into the project directory.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm start` to launch the application in your browser.

## Functionalities

- Users can add income and expense transactions.
- Each transaction includes an amount, category, date, and type (income/expense).
- Users can view a list of all transactions, categorized for easy viewing.
- The total balance is calculated by subtracting expenses from income.
- Users can add new categories for transactions.

## Notes on Redux and Material UI

- **Redux** is used to manage the state of transactions, categories, and balance. All actions (adding transactions, categories) are dispatched to the Redux store, and components subscribe to this data.
- **Material UI** components are used for building a user-friendly interface. Buttons, text fields, menus, and cards are styled using Material UI's theming system.
