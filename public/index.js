"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = exports.Branch = exports.Customer = exports.Transaction = void 0;
class Transaction {
    constructor(amount) {
        this.amount = amount;
        this.date = new Date();
    }
}
exports.Transaction = Transaction;
class Customer {
    constructor(name, id) {
        if (typeof name !== 'string') {
            throw new Error('not a string');
        }
        if (typeof id !== 'number') {
            throw new Error('not a number');
        }
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getTransactions() {
        return this.transactions;
    }
    getBalance() {
        const balance = this.transactions.reduce((total, transaction) => {
            return total + transaction.amount;
        }, 0);
        return balance;
    }
    addTransactions(amount) {
        const balance = this.getBalance();
        if (balance + amount > 0) {
            const transaction = new Transaction(amount);
            this.transactions.push(transaction);
            return true;
        }
        else
            return false;
    }
}
exports.Customer = Customer;
class Branch {
    constructor(name) {
        if (typeof name !== 'string') {
            throw new Error('not a string');
        }
        this.name = name;
        this.customers = [];
    }
    getName() {
        return this.name;
    }
    getCustomers() {
        return this.customers;
    }
    addCustomer(customer) {
        if (!this.customers.includes(customer)) {
            this.customers.push(customer);
            return true;
        }
        else
            return false;
    }
    addCustomerTransaction(customerId, amount) {
        const customer = this.customers.find((customer) => customer.id === customerId);
        if (customer) {
            customer.addTransactions(amount);
            return true;
        }
        else
            return false;
    }
    //-------------------------------
    searchCustomerByNameOrId(keySearch) {
        if (typeof keySearch === 'number') {
            const customer = this.getCustomers().find((customer) => customer.id === keySearch);
            if (customer)
                console.log(`Seach customer by id ${keySearch}: found `);
            else
                console.log(`Seach customer by id ${keySearch}: not found `);
        }
        if (typeof keySearch === 'string') {
            keySearch = keySearch.toLowerCase();
            const customer = this.getCustomers().find((customer) => customer.name.toLowerCase() === keySearch);
            if (customer)
                console.log(`Seach customer ${keySearch}: found `);
            else
                console.log(`Seach customer ${keySearch}: not found `);
        }
    }
}
exports.Branch = Branch;
class Bank {
    constructor(name) {
        if (typeof name !== 'string') {
            throw new Error('not a string');
        }
        this.name = name;
        this.branches = [];
    }
    addBranch(branch) {
        if (this.branches.includes(branch))
            return false;
        else {
            this.branches.push(branch);
            return true;
        }
    }
    addCustomer(branch, customer) {
        if (branch.getCustomers().includes(customer))
            return false;
        else {
            branch.addCustomer(customer);
            return true;
        }
    }
    addCustomerTransaction(branch, customerId, amount) {
        if (this.checkBranch(branch)) {
            branch.addCustomerTransaction(customerId, amount);
            return true;
        }
        else
            return false;
    }
    checkBranch(branch) {
        if (this.branches.includes(branch))
            return true;
        else
            return false;
    }
    //findBranchByName(branchName: string): Branch[] | null
    // Description: Returns a list of matched branches with the specified branchName or null if no matches were found.
    findBranchByName(branchName) {
        const result = this.branches.find((branch) => branch.name === branchName);
        if (result)
            return result;
        else
            return null;
    }
    // listCustomers(branch: Branch, includeTransactions: boolean): void
    //   Description: Prints out a list of customers with their transaction details if includeTransactions is true.
    listCustomers(branch, includeTransactions) {
        const customers = branch.getCustomers();
        console.log(`List of customers with their transaction details in ${branch.name}`);
        customers.forEach((customer) => {
            console.log(`Customer Name:\n${customer.name} `);
            if (includeTransactions && customer.transactions.length > 0) {
                console.log(`Transactions:(Amount, Date) `);
                customer
                    .getTransactions()
                    .forEach((transaction) => console.log(`${transaction.amount},  ${transaction.date}`));
                console.log('----------------------');
            }
            else {
                console.log('No transactions found');
                console.log('----------------------');
            }
        });
    }
}
exports.Bank = Bank;
