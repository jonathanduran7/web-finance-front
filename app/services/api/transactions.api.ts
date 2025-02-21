import { PaginatedResponse } from "@/app/interfaces/Response";
import { Transaction } from "@/app/models/Transaction";

export async function getTransactionsPaginated({
  page = 1,
  limit = 10,
  orderBy = "ASC",
}: {
  page?: number;
  limit?: number;
  orderBy?: string;
}): Promise<PaginatedResponse<Transaction>> {
  const response = await fetch(
    `http://localhost:3333/transaction/query?page=${page}&limit=${limit}&order=${orderBy}`,
  );
  if (!response.ok) {
    throw new Error("Error fetching transactions");
  }
  return response.json();
}
