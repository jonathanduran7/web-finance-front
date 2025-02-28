import { PaginatedResponse } from "@/app/interfaces/Response";
import { Transfer } from "@/app/models/Transfer";

export async function getTransferPaginated({
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
}): Promise<PaginatedResponse<Transfer>> {
  let baseUrl = `http://localhost:3333/transfer/query?page=${page}&limit=${limit}&order=${orderBy}`;

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
      accountId: "sourceAccount.id",
      categoryId: "destinationAccount.id",
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

  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Error fetching transactions");
  }
  return response.json();
}
