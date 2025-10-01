// 🏦 Banking System (Mini Fintech App):

// Requirements

// Customers can open accounts (SavingsAccount, CheckingAccount, etc.).

// Each account has balance, account number, and owner.

// Accounts support deposit and withdrawal.

// Some accounts have extra rules:

// Savings accounts can’t be overdrawn.

// Checking accounts can have overdraft limits.

// Customers can request loans, and loans must be approved by a LoanOfficer.

// The system should generate transaction history for each account.

// Add a static utility in the Bank class to transfer money between accounts.

// -------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------

// Bonus Challenge (optional, if you’re brave):

// Add a CreditCard class tied to a Customer, with its own repayment logic.

// Add BankReport class that prints all balances and loans for auditing.

// ---------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------

// type Money = number; // integer cents

// function toCents(dollars: number): Money {
//   return Math.round(dollars * 100);
// }
// function fmt(m: Money): string {
//   return `$${(m / 100).toFixed(2)}`;
// }
// let _idCounter = 1;
// function genId(prefix = "") {
//   return `${prefix}${_idCounter++}`;
// }

// enum TxType {
//   DEPOSIT = "DEPOSIT",
//   WITHDRAW = "WITHDRAW",
//   TRANSFER = "TRANSFER",
//   LOAN = "LOAN",
//   CARD = "CARD",
//   FEE = "FEE",
// }

// class Transaction {
//   id: string;
//   timestamp: Date;
//   type: TxType;
//   amount: Money; // positive for deposit/credit, negative for withdraw/debit
//   balanceAfter: Money;
//   description?: string | undefined;

//   constructor(
//     type: TxType,
//     amount: Money,
//     balanceAfter: Money,
//     description?: string | undefined
//   ) {
//     this.id = genId("tx-");
//     this.timestamp = new Date();
//     this.type = type;
//     this.amount = amount;
//     this.balanceAfter = balanceAfter;
//     this.description = description;
//   }
// }

// class Customer {
//   id: string;
//   name: string;
//   constructor(name: string) {
//     this.id = genId("cust-");
//     this.name = name;
//   }
// }

// abstract class Account {
//   accountNumber: string;
//   owner: Customer;
//   protected balance: Money;
//   transactions: Transaction[] = [];

//   constructor(owner: Customer, initialDeposit: Money = 0) {
//     this.accountNumber = genId("acct-");
//     this.owner = owner;
//     this.balance = 0;
//     if (initialDeposit > 0) this.deposit(initialDeposit, "Initial deposit");
//   }

//   getBalance(): Money {
//     return this.balance;
//   }

//   deposit(amount: Money, description?: string): Transaction {
//     if (amount <= 0) throw new Error("Deposit amount must be > 0");
//     this.balance += amount;
//     const tx = new Transaction(
//       TxType.DEPOSIT,
//       amount,
//       this.balance,
//       description
//     );
//     this.transactions.push(tx);
//     return tx;
//   }

//   withdraw(amount: Money, description?: string): Transaction {
//     if (amount <= 0) throw new Error("Withdraw amount must be > 0");
//     if (!this.canWithdraw(amount)) {
//       throw new Error("Insufficient funds or overdraft limit reached");
//     }
//     this.balance -= amount;
//     const tx = new Transaction(
//       TxType.WITHDRAW,
//       -amount,
//       this.balance,
//       description
//     );
//     this.transactions.push(tx);
//     return tx;
//   }

//   protected recordTransfer(
//     amount: Money,
//     balanceAfter: Money,
//     description?: string
//   ): Transaction {
//     const tx = new Transaction(
//       TxType.TRANSFER,
//       amount,
//       balanceAfter,
//       description
//     );
//     this.transactions.push(tx);
//     return tx;
//   }

//   abstract canWithdraw(amount: Money): boolean;
// }

// class SavingsAccount extends Account {
//   constructor(owner: Customer, initialDeposit: Money = 0) {
//     super(owner, initialDeposit);
//   }
//   canWithdraw(amount: Money): boolean {
//     return this.balance - amount >= 0; // cannot go negative
//   }
// }

// class CheckingAccount extends Account {
//   overdraftLimit: Money; // positive number of cents allowed negative
//   constructor(
//     owner: Customer,
//     initialDeposit: Money = 0,
//     overdraftLimit: Money = 0
//   ) {
//     super(owner, initialDeposit);
//     this.overdraftLimit = overdraftLimit;
//   }
//   canWithdraw(amount: Money): boolean {
//     return this.balance - amount >= -this.overdraftLimit;
//   }
// }

// enum LoanStatus {
//   PENDING = "PENDING",
//   APPROVED = "APPROVED",
//   REJECTED = "REJECTED",
//   PAID = "PAID",
// }

// class Loan {
//   id: string;
//   customer: Customer;
//   amount: Money;
//   interestRateAnnualPct: number;
//   termMonths: number;
//   status: LoanStatus = LoanStatus.PENDING;
//   createdAt: Date = new Date();
//   approvedBy?: string;
//   approvedAt?: Date;

//   constructor(
//     customer: Customer,
//     amount: Money,
//     interestRateAnnualPct: number,
//     termMonths: number
//   ) {
//     this.id = genId("loan-");
//     this.customer = customer;
//     this.amount = amount;
//     this.interestRateAnnualPct = interestRateAnnualPct;
//     this.termMonths = termMonths;
//   }
// }

// class LoanOfficer {
//   id: string;
//   name: string;
//   constructor(name: string) {
//     this.id = genId("off-");
//     this.name = name;
//   }

//   approve(
//     loan: Loan,
//     approve: boolean,
//     bank: Bank,
//     targetAccount?: Account,
//     note?: string
//   ) {
//     if (loan.status !== LoanStatus.PENDING) throw new Error("Loan not pending");
//     if (approve) {
//       // Simple approval rule: bank funds the loan amount into the targetAccount
//       loan.status = LoanStatus.APPROVED;
//       loan.approvedBy = this.id;
//       loan.approvedAt = new Date();
//       bank.fundLoan(loan, targetAccount, note ?? `Approved by ${this.name}`);
//     } else {
//       loan.status = LoanStatus.REJECTED;
//       loan.approvedBy = this.id;
//       loan.approvedAt = new Date();
//     }
//   }
// }

// class CreditCard {
//   id: string;
//   owner: Customer;
//   limit: Money;
//   balance: Money = 0; // positive balance is owed by the customer
//   transactions: Transaction[] = [];

//   constructor(owner: Customer, limit: Money) {
//     this.id = genId("cc-");
//     this.owner = owner;
//     this.limit = limit;
//   }

//   charge(amount: Money, description?: string): Transaction {
//     if (amount <= 0) throw new Error("Charge must be > 0");
//     if (this.balance + amount > this.limit)
//       throw new Error("Credit limit exceeded");
//     this.balance += amount;
//     const tx = new Transaction(
//       TxType.CARD,
//       amount,
//       -this.balance,
//       description || "Card charge"
//     );
//     this.transactions.push(tx);
//     return tx;
//   }

//   repay(amount: Money, description?: string): Transaction {
//     if (amount <= 0) throw new Error("Repay amount must be > 0");
//     this.balance -= amount;
//     if (this.balance < 0) this.balance = 0; // don't track negative credit balance in this simple model
//     const tx = new Transaction(
//       TxType.CARD,
//       -amount,
//       -this.balance,
//       description || "Card repayment"
//     );
//     this.transactions.push(tx);
//     return tx;
//   }
// }

// class Bank {
//   customers = new Map<string, Customer>();
//   accounts = new Map<string, Account>();
//   loans = new Map<string, Loan>();
//   loanOfficers = new Map<string, LoanOfficer>();
//   creditCards = new Map<string, CreditCard>();

//   createCustomer(name: string): Customer {
//     const c = new Customer(name);
//     this.customers.set(c.id, c);
//     return c;
//   }

//   openSavings(owner: Customer, initialDeposit: Money = 0): SavingsAccount {
//     const a = new SavingsAccount(owner, initialDeposit);
//     this.accounts.set(a.accountNumber, a);
//     return a;
//   }
//   openChecking(
//     owner: Customer,
//     initialDeposit: Money = 0,
//     overdraftLimit: Money = 0
//   ): CheckingAccount {
//     const a = new CheckingAccount(owner, initialDeposit, overdraftLimit);
//     this.accounts.set(a.accountNumber, a);
//     return a;
//   }

//   registerLoanOfficer(name: string): LoanOfficer {
//     const off = new LoanOfficer(name);
//     this.loanOfficers.set(off.id, off);
//     return off;
//   }

//   requestLoan(
//     customer: Customer,
//     amount: Money,
//     rateAnnualPct: number,
//     termMonths: number
//   ): Loan {
//     if (amount <= 0) throw new Error("Loan amount must be > 0");
//     const loan = new Loan(customer, amount, rateAnnualPct, termMonths);
//     this.loans.set(loan.id, loan);
//     return loan;
//   }

//   // Called by LoanOfficer.approve
//   fundLoan(loan: Loan, targetAccount?: Account, note?: string) {
//     if (loan.status !== LoanStatus.APPROVED)
//       throw new Error("Loan not approved");
//     // Choose target account: if none specified, try to find any checking account for the customer
//     let acct = targetAccount;
//     if (!acct) {
//       acct =
//         Array.from(this.accounts.values()).find(
//           (a) => a.owner.id === loan.customer.id && a instanceof CheckingAccount
//         ) || undefined;
//     }
//     if (!acct) throw new Error("No target account found to disburse loan");
//     acct.deposit(loan.amount, `Loan disbursement ${loan.id}: ${note ?? ""}`);
//   }

//   static transfer(
//     from: Account,
//     to: Account,
//     amount: Money,
//     description?: string
//   ): { fromTx: Transaction; toTx: Transaction } {
//     if (amount <= 0) throw new Error("Transfer amount must be > 0");
//     // Withdraw from source (may throw)
//     try {
//       from.withdraw(
//         amount,
//         `Transfer to ${to.accountNumber}: ${description ?? ""}`
//       );
//     } catch (err) {
//       throw new Error(
//         "Transfer failed: " + (err instanceof Error ? err.message : String(err))
//       );
//     }
//     // Deposit into target
//     try {
//       to.deposit(
//         amount,
//         `Transfer from ${from.accountNumber}: ${description ?? ""}`
//       );
//     } catch (err) {
//       // Rollback withdraw (best-effort)
//       from.deposit(
//         amount,
//         `Rollback of failed transfer to ${to.accountNumber}`
//       );
//       throw new Error("Transfer failed during deposit. Rolled back.");
//     }
//     // Create explicit transfer tx records for clarity (we've already created withdraw/deposit txs)
//     const fromTx = from.transactions[from.transactions.length - 1];
//     const toTx = to.transactions[to.transactions.length - 1];
//     return { fromTx, toTx };
//   }

//   createCreditCard(owner: Customer, limit: Money): CreditCard {
//     const cc = new CreditCard(owner, limit);
//     this.creditCards.set(cc.id, cc);
//     return cc;
//   }

//   produceBankReport(): string {
//     const lines: string[] = [];
//     lines.push("=== BANK REPORT ===");
//     lines.push("Accounts:");
//     for (const acct of this.accounts.values()) {
//       lines.push(
//         `${acct.accountNumber} | ${acct.owner.name} | Balance: ${fmt(
//           acct.getBalance()
//         )} | Type: ${acct instanceof SavingsAccount ? "Savings" : "Checking"}`
//       );
//     }
//     lines.push("");
//     lines.push("Loans:");
//     for (const loan of this.loans.values()) {
//       lines.push(
//         `${loan.id} | Customer: ${loan.customer.name} | Amount: ${fmt(
//           loan.amount
//         )} | Status: ${loan.status} | APR: ${loan.interestRateAnnualPct}%`
//       );
//     }
//     lines.push("");
//     lines.push("Credit Cards:");
//     for (const cc of this.creditCards.values()) {
//       lines.push(
//         `${cc.id} | Owner: ${cc.owner.name} | Balance owed: ${fmt(
//           cc.balance
//         )} | Limit: ${fmt(cc.limit)}`
//       );
//     }
//     lines.push("=== END REPORT ===");
//     return lines.join("\n");
//   }
// }

// /* ------------------ Demo usage / tests ------------------ */

// function demo() {
//   const bank = new Bank();

//   const alice = bank.createCustomer("Alice");
//   const bob = bank.createCustomer("Bob");

//   const aliceChecking = bank.openChecking(alice, toCents(100), toCents(200)); // $100 initial, $200 overdraft
//   const aliceSavings = bank.openSavings(alice, toCents(500)); // $500
//   const bobChecking = bank.openChecking(bob, toCents(50), toCents(0)); // $50, no overdraft

//   console.log("Initial balances:");
//   console.log("Alice checking:", fmt(aliceChecking.getBalance()));
//   console.log("Alice savings:", fmt(aliceSavings.getBalance()));
//   console.log("Bob checking:", fmt(bobChecking.getBalance()));

//   // Deposit
//   aliceChecking.deposit(toCents(25), "Paycheck");
//   // Withdraw (allowed within overdraft)
//   aliceChecking.withdraw(toCents(350), "Rent + misc"); // pushes into overdraft

//   // Transfer: from Alice savings to Bob checking (atomic)
//   try {
//     Bank.transfer(aliceSavings, bobChecking, toCents(200), "Pay Bob back");
//   } catch (err) {
//     console.error("Transfer failed:", err);
//   }

//   // Loan request + approval
//   const loanOfficer = bank.registerLoanOfficer("Sam the Approver");
//   const loan = bank.requestLoan(alice, toCents(1000), 6.5, 12); // $1000 loan
//   loanOfficer.approve(loan, true, bank, aliceChecking, "Good credit");

//   // Credit card charge & repay
//   const cc = bank.createCreditCard(bob, toCents(2000)); // $2,000 limit
//   cc.charge(toCents(150), "Grocery");
//   cc.repay(toCents(50), "Partial payment");

//   // Print some stuff
//   console.log("\nAfter transactions:");
//   console.log("Alice checking:", fmt(aliceChecking.getBalance()));
//   console.log("Alice savings:", fmt(aliceSavings.getBalance()));
//   console.log("Bob checking:", fmt(bobChecking.getBalance()));
//   console.log("Bob credit card balance owed:", fmt(cc.balance));

//   // Transaction history example
//   console.log("\nAlice checking transactions (last 5):");
//   for (const t of aliceChecking.transactions.slice(-5)) {
//     console.log(
//       `${t.id} | ${t.type} | ${t.description ?? ""} | amount: ${fmt(
//         t.amount
//       )} | balAfter: ${fmt(t.balanceAfter)}`
//     );
//   }

//   // Bank report
//   console.log("\n" + bank.produceBankReport());
// }

// demo();
