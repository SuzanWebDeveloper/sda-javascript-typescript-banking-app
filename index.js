//@ts-nocheck
//export { Transaction, Customer, Branch, Bank };

export class Transaction {
  amount;
  date;
  constructor(amount) {
    this.amount = amount;
    this.date = new Date();
  }
}

export class Customer {
  name;
  id;
  transactions = [];

  constructor(name, id) {
    //        if(typeof name!=="string"){
    //        console.error("Not a string")
    //        return;
    //        }
    //        if (typeof name == 'string') {
    //         this.name = name;
    //        }

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
    if (this.transactions) return this.transactions;
    else return false;
    //return this.transactions;
  }
  getBalance() {
    //** I have to give it initial value 0 to work**
    let balance = this.transactions.reduce((total, transaction) => {
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
    } else return false;
  }
}

export class Branch {
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
      customer.addTransactions(amount);
      return true;
    } else return false;
  }
}

export class Bank {
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
    console.log(
      `List of customers with their transaction details in ${branch.name}`
    );
    customers.forEach((customer) => {
      console.log(`Customer Name:\n${customer.name} `);
      if (includeTransactions && customer.transactions.length > 0) {
        console.log(`Transactions:(Amount, Date) `);
        customer
          .getTransactions()
          .forEach((transaction) =>
            console.log(`${transaction.amount},  ${transaction.date}`)
          );
        console.log('----------------------');
      } else {
        console.log('No transactions found');
        console.log('----------------------');
      }
    });
  }
}
