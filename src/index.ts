

export class Transaction {
  amount: number;
  date: Date;
  constructor(amount: number) {
    this.amount = amount;
    this.date = new Date();
  }
}

export class Customer {
  name: string;
  id: number;
  transactions: Transaction[];

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }

  getName(): string {
    return this.name;
  }
  getId(): number {
    return this.id;
  }
  getTransactions(): Transaction[] {
    return this.transactions;
  }
  getBalance(): number {
    //** I have to give it initial value 0 to work**
    const balance = this.transactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
    return balance;
  }
  addTransactions(amount: number): boolean {
    const balance = this.getBalance();
    if (balance + amount > 0) {
      const transaction = new Transaction(amount);
      this.transactions.push(transaction);
      return true;
    } else return false;
  }
}

export class Branch {
  name: string;
  customers: Customer[];

  constructor(name: string) {
    this.name = name;
    this.customers = [];
  }
  getName(): string {
    return this.name;
  }
  getCustomers(): Customer[] {
    return this.customers;
  }
  addCustomer(customer: Customer): boolean {
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      return true;
    } else return false;
  }
  addCustomerTransaction(customerId: number, amount: number): boolean {
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
  name: string;
  branches: Branch[];

  constructor(name: string) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch: Branch): boolean {
    if (this.branches.includes(branch)) return false;
    else {
      this.branches.push(branch);
      return true;
    }
  }

  addCustomer(branch: Branch, customer: Customer): boolean {
    if (branch.getCustomers().includes(customer)) return false;
    else {
      branch.addCustomer(customer);
      return true;
    }
  }

  addCustomerTransaction(
    branch: Branch,
    customerId: number,
    amount: number
  ): boolean {
    if (this.checkBranch(branch)) {
      branch.addCustomerTransaction(customerId, amount);
      return true;
    } else return false;
  }

  checkBranch(branch: Branch): boolean {
    if (this.branches.includes(branch)) return true;
    else return false;
  }

  //findBranchByName(branchName: string): Branch[] | null
  // Description: Returns a list of matched branches with the specified branchName or null if no matches were found.
  findBranchByName(branchName: string): Branch | null {
    const result = this.branches.find((branch) => branch.name === branchName);
    if (result) return result;
    else return null;
  }

  // listCustomers(branch: Branch, includeTransactions: boolean): void
  //   Description: Prints out a list of customers with their transaction details if includeTransactions is true.
  listCustomers(branch: Branch, includeTransactions: boolean) {
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
