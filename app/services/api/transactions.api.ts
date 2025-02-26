import { PaginatedResponse } from "@/app/interfaces/Response";
import { Transaction } from "@/app/models/Transaction";

export async function getTransactionsPaginated({
  page = 1,
  limit = 10,
  orderBy = "DESC",
  search,
  filters,
}: {
  page?: number;
  limit?: number;
  orderBy?: string;
  search?: string;
  filters?: Record<string, string>;
}): Promise<PaginatedResponse<Transaction>> {
  let baseUrl = `http://localhost:3333/transaction/query?page=${page}&limit=${limit}&order=${orderBy}`;

  if (search) {
    baseUrl += `&search=${search}`;
  }

  if (filters) {
    for (const key in filters) {
      baseUrl += `&${key}=${filters[key]}`;
    }
  }

  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Error fetching transactions");
  }
  return response.json();
}

export async function createTransaction(transaction: {
  title: string;
  amount: number;
  description?: string;
  date: string;
  accountId: number;
  categoryId: number;
}) {
  const response = await fetch("http://localhost:3333/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: transaction.title,
      amount: Number(transaction.amount),
      description: transaction.description,
      date: transaction.date,
      accountId: Number(transaction.accountId),
      categoryId: Number(transaction.categoryId),
    }),
  });

  if (!response.ok) {
    throw new Error("Error creating transaction");
  }
}

export async function deleteTransaction(id: string) {
  const response = await fetch(`http://localhost:3333/transaction/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting transaction");
  }
}

export async function updateTransaction(transaction: {
  id: number;
  title: string;
  amount: number;
  description?: string;
  accountId: number;
  categoryId: number;
}) {
  const response = await fetch(
    `http://localhost:3333/transaction/${transaction.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: transaction.title,
        amount: Number(transaction.amount),
        description: transaction.description,
        accountId: Number(transaction.accountId),
        categoryId: Number(transaction.categoryId),
      }),
    },
  );
  if (!response.ok) {
    throw new Error("Error updating transaction");
  }
}
