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
    const transaction = new Transaction(amount);
    this.transactions.push(transaction);
    return true;

    //** need to do false condition**
  }
}

class Branch {
  name;
  customers = [];

  constructor(name) {
    this.name = name;
  }
  getName(name) {
    this.name = name;
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
    this.customers.find((customer) => {
      if (customer.id === customerId) {
        customer.addTransactions(amount);
        return true;
      } else return false;
    });
  }
}

class Bank {
  name;
  branches = [];

  constructor(name) {
    this.name = name;
  }

  addBranch(branch) {
    this.branches.find((br) => {
      if (br.name === branch.name) return false;
      else {
        this.branches.push(branch);
        return false;
      }
    });
  }

  addCustomer(branch, customer) {
    //if customer in branch don't add
    //this.branches.includes(branch)
    if (branch.getCustomers.includes(customer)) return false;
    else {
      branch.addCustomer(customer);
      return true;
    }
  }

  checkBranch(branch) {
    if (this.branches.includes(branch)) return true;
    else return false;
  }
  addCustomerTransaction(branch, customerId, amount) {
    if (this.checkBranch()) {
      branch.addCustomerTransaction(customerId, amount);
      return true;
    } else return false;
  }

  //findBranchByName(branchName: string): Branch[] | null
  // Description: Returns a list of matched branches with the specified branchName or null if no matches were found.
  findBranchByName(branchName) {
    const result = this.branches.find((branch) => {
      if (branch.name === branchName) return branch;
      else return null;
    });
    return result;
  }

  // listCustomers(branch: Branch, includeTransactions: boolean): void
  //   Description: Prints out a list of customers with their transaction details if includeTransactions is true.
  listCustomers(branch, includeTransactions) {
    const customers = branch.getCustomers();
    console.log(`${customers.name}, `);
  }
}

//------------------------------

const trans = new Transaction(50);
console.log(trans);

const customer1 = new Customer('John', 1);
customer1.addTransaction(10);
customer1.addTransaction(23);

console.log(customer1.getTransactions());
console.log(customer1.getBalance());
