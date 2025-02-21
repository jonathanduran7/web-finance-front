import { Account } from "./Accounts";
import { Category } from "./Category";

export interface Transaction {
  id: number;
  amount: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  account: Account;
  category: Category;
}
