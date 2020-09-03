/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all() {
    this.getBalance();
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    function total(itemTotal: any, item: any) {
      itemTotal.income += item.type === 'income' ? item.value : 0;
      itemTotal.outcome += item.type === 'outcome' ? item.value : 0;
      itemTotal.total = itemTotal.income - itemTotal.outcome;

      return itemTotal;
    }

    return this.transactions.reduce(total, { income: 0, outcome: 0, total: 0 });
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
