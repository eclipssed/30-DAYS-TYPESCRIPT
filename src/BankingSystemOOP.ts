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

class Customer {
  constructor(public name: string, public accounts: BankAccount[] = []) {}

  requestLoan(amount: number): boolean {
    return true;
  }
}
class LoanOfficer {
  constructor(public name: string) {}

  validateLoan(amount: number): boolean {
    return amount < 10000;
  }
}

class Bank {
  static transfer(from: BankAccount, to: BankAccount, amount: number): boolean {
    if (!from.withdraw(amount)) return false;
    to.deposit(amount);
    
    return true;
  }
}

abstract class BankAccount {
  constructor(
    public balance: number,
    public accountNumber: number,
    public owner: string
  ) {}

  deposit(amount: number): boolean {
    this.balance += amount;
    return true;
  }

  abstract withdraw(amount: number): boolean;
}

class SavingAccount extends BankAccount {
  withdraw(amount: number): boolean {
    if (this.balance - amount < 0) return false;
    else {
      this.balance -= amount;
      return true;
    }
  }
}
class CheckingAccount extends BankAccount {
  constructor(
    balance: number,
    accountNumber: number,
    owner: string,
    public overdraftLimit: number
  ) {
    super(balance, accountNumber, owner);
  }
  withdraw(amount: number): boolean {
    if (this.balance - amount < -this.overdraftLimit) return false;
    else {
      this.balance -= amount;
      return true;
    }
  }
}

class TransactionHistory {
  constructor(
    public fromAccountNumber: number,
    public toAccountNumber: number,
    public amount: number
  ) {}
}

// ---------------------------------------------------------------------------------------------

// Bonus Challenge (optional, if you’re brave):

// Add a CreditCard class tied to a Customer, with its own repayment logic.

// Add BankReport class that prints all balances and loans for auditing.

// ---------------------------------------------------------------------------------------------
