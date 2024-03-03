import { Bank, Branch, Customer, Transaction } from './index.js';

const arizonaBank = new Bank('Arizona');
const westBranch = new Branch('West Branch');
const sunBranch = new Branch('Sun Branch');
const customer1 = new Customer('John', 1);
const customer2 = new Customer('Anna', 2);
const customer3 = new Customer('John', 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);

console.log(
  `Find branch name 'bank' = ${arizonaBank.findBranchByName('bank')}`
);
console.log(`Find branch name 'sun' = ${arizonaBank.findBranchByName('sun')}`);
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
customer1.addTransactions(-1000);
console.log(customer1.getBalance());
arizonaBank.listCustomers(westBranch, true);
arizonaBank.listCustomers(sunBranch, true);
const customerKeyName = 'joyhn';
westBranch.searchCustomerByName(customerKeyName);
