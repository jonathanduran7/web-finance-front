import { PaginatedResponse } from "@/app/interfaces/Response";
import { Dashboard } from "@/app/models/Dashboard";
import { Transaction } from "@/app/models/Transaction";
import dayjs from "dayjs";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getTransactionsPaginated({
  page = 1,
  limit = 10,
  orderBy = "DESC",
  search,
  filters,
  startDate,
  endDate,
}: {
  page?: number;
  limit?: number;
  orderBy?: string;
  search?: string;
  filters?: Record<string, string>;
  startDate?: string;
  endDate?: string;
}): Promise<PaginatedResponse<Transaction>> {
  const token = JSON.parse(localStorage.getItem("token")!);
  let baseUrl = `${apiUrl}/transaction/query?page=${page}&limit=${limit}&order=${orderBy}`;

  if (search) {
    baseUrl += `&search=${search}`;
  }

  if (filters) {
    filters = Object.fromEntries(
      Object.entries(filters).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value !== "" && value !== "0",
      ),
    );

    const relations = {
      accountId: "account.id",
      categoryId: "category.id",
    };

    for (const key in filters) {
      baseUrl += `&filters[${relations[key as keyof typeof relations]}]=${filters[key]}`;
    }
  }

  if (startDate) {
    baseUrl += `&startDate=${startDate}`;
  }
  if (endDate) {
    baseUrl += `&endDate=${endDate}`;
  }

  const response = await fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${token!.access_token}`,
    },
  });

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
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`${apiUrl}/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.access_token}`,
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
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`${apiUrl}/transaction/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token!.access_token}`,
    },
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
  date: string;
}) {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`${apiUrl}/transaction/${transaction.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.access_token}`,
    },
    body: JSON.stringify({
      title: transaction.title,
      amount: Number(transaction.amount),
      description: transaction.description,
      accountId: Number(transaction.accountId),
      categoryId: Number(transaction.categoryId),
      date: transaction.date,
    }),
  });
  if (!response.ok) {
    throw new Error("Error updating transaction");
  }
}

export async function getDashboard(): Promise<Dashboard> {
  const startDate = dayjs().startOf("month").format("YYYY-MM-DD");
  const endDate = dayjs().endOf("month").format("YYYY-MM-DD");
  const token = JSON.parse(localStorage.getItem("token")!);

  const response = await fetch(
    `${apiUrl}/transaction/dashboard?startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token!.access_token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error fetching dashboard");
  }
  return response.json();
}
