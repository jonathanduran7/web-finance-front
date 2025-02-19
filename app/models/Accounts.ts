import { Currency } from "./Currency";

export interface Account {
  id: number;
  name: string;
  initialBalance: number;
  createdAt: string;
  updatedAt: string;
  currency: Currency;
}
