import { Account } from "@/app/models/Accounts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getAccount(): Promise<Account[]> {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`${apiUrl}/account`, {
    headers: {
      Authorization: `Bearer ${token!.access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching currencies");
  }
  return response.json() as Promise<Account[]>;
}

export async function removeAccount(id: string): Promise<void> {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`${apiUrl}/account/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token!.access_token}`,
    },
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
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`${apiUrl}/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.access_token}`,
    },
    body: JSON.stringify({ name, currencyId, initialBalance }),
  });
  if (!response.ok) {
    throw new Error("Error creating currency");
  }
}

export async function updateAccount({
  name,
  currencyId,
  initialBalance,
  accountId,
}: {
  name: string;
  currencyId: number;
  initialBalance: number;
  accountId: string;
}) {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`${apiUrl}/account/${accountId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.access_token}`,
    },
    body: JSON.stringify({ name, currencyId, initialBalance }),
  });
  if (!response.ok) {
    throw new Error("Error updating currency");
  }
}
