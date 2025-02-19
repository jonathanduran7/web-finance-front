import { Account } from "@/app/models/Accounts";

export async function getAccount(): Promise<Account[]> {
  const response = await fetch("http://localhost:3333/account");
  if (!response.ok) {
    throw new Error("Error fetching currencies");
  }
  return response.json() as Promise<Account[]>;
}
