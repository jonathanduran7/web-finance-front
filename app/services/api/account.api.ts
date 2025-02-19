import { Account } from "@/app/models/Accounts";

export async function getAccount(): Promise<Account[]> {
  const response = await fetch("http://localhost:3333/account");
  if (!response.ok) {
    throw new Error("Error fetching currencies");
  }
  return response.json() as Promise<Account[]>;
}

export async function removeAccount(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3333/account/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting currency");
  }
}

export async function createAccount({
  name,
  currencyId,
  initialBalance,
}: {
  name: string;
  currencyId: number;
  initialBalance?: number;
}) {
  const response = await fetch("http://localhost:3333/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, currencyId, initialBalance }),
  });
  if (!response.ok) {
    throw new Error("Error creating currency");
  }
}
