//@ts-nocheck

class Transaction {
  amount;
  date;
  constructor(amount) {
    this.amount = amount;
    this.date = new Date();
  }
}

class Customer {
  name;
  id;
  transactions = [];

  constructor(name, id) {
    this.name = name;
    this.id = id;
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
    //** I have to give it initial value 0 to work**
    let balance = this.transactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
    return balance;
  }
  addTransaction(amount) {
    const balance = this.getBalance();
    if (balance + amount > 0) {
      const transaction = new Transaction(amount);
      this.transactions.push(transaction);
      return true;
    } else return false;
  }
}

class Branch {
  name;
  customers = [];

  constructor(name) {
    this.name = name;
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
    } else return false;
  }
  addCustomerTransaction(customerId, amount) {
    const customer = this.customers.find(
      (customer) => customer.id === customerId
    );
    if (customer) {
      customer.addTransaction(amount);
      return true;
    } else return false;

    // ** This works too **
    // const customer = this.customers.find(
    //   ({ id}) => id === customerId
    // );
    // console.log(customer);
    // if (customer) {
    //   customer.addTransaction(amount);
    //   return true;
    // } else return false;
    //---------------------------------
  }
}

class Bank {
  name;
  branches = [];

  constructor(name) {
    this.name = name;
  }

  addBranch(branch) {
    if (this.branches.includes(branch)) return false;
    else {
      this.branches.push(branch);
      return true;
    }
  }

  addCustomer(branch, customer) {
    if (branch.getCustomers().includes(customer)) return false;
    else {
      branch.addCustomer(customer);
      return true;
    }
  }

  addCustomerTransaction(branch, customerId, amount) {
    if (this.checkBranch(branch)) {
      branch.addCustomerTransaction(customerId, amount);
      return true;
    } else return false;

    //** anisol code**
    // const targetBranch = this.findBranchByName(branch.name);
    // if (targetBranch) {
    //   targetBranch.addCustomerTransaction(customerId, amount);
    //   return true;
    // } else return false;
  }

  checkBranch(branch) {
    if (this.branches.includes(branch)) return true;
    else return false;
  }

  //findBranchByName(branchName: string): Branch[] | null
  // Description: Returns a list of matched branches with the specified branchName or null if no matches were found.
  findBranchByName(branchName) {
    const result = this.branches.find((branch) => branch.name === branchName);
    if (result) return result;
    else return null;
  }

  // listCustomers(branch: Branch, includeTransactions: boolean): void
  //   Description: Prints out a list of customers with their transaction details if includeTransactions is true.
  listCustomers(branch, includeTransactions) {
    const customers = branch.getCustomers();
    customers.forEach((customer) => {
      console.log(`Customer Name:\n${customer.name} `);
      if (includeTransactions) {
        console.log(`Transactions:(Amount, Date) `);
        customer
          .getTransactions()
          .forEach((transaction) =>
            console.log(`${transaction.amount},  ${transaction.date}`)
          );
      }
    });
  }
}

//---------------------------------------------------

const arizonaBank = new Bank('Arizona');
const westBranch = new Branch('West Branch');
const sunBranch = new Branch('Sun Branch');
const customer1 = new Customer('John', 1);
const customer2 = new Customer('Anna', 2);
const customer3 = new Customer('John', 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);

arizonaBank.findBranchByName('bank');
arizonaBank.findBranchByName('sun');

arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

customer1.addTransaction(-1000);
console.log(customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));
console.log(sunBranch.getCustomers());
