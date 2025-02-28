import { Account } from "./Accounts";

export interface Transfer {
  id: number;
  sourceAccount: Account;
  destinationAccount: Account;
  amount: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
