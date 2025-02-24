import { PaginatedResponse } from "@/app/interfaces/Response";
import { Transaction } from "@/app/models/Transaction";

export async function getTransactionsPaginated({
  page = 1,
  limit = 10,
  orderBy = "ASC",
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
  console.log(baseUrl);

  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Error fetching transactions");
  }
  return response.json();
}
