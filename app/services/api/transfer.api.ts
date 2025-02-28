import { PaginatedResponse } from "@/app/interfaces/Response";
import { Transfer } from "@/app/models/Transfer";

type TransferCreate = Omit<
  Transfer,
  "createdAt" | "updatedAt" | "id" | "sourceAccount" | "destinationAccount"
>;

type TransferUpdate = Omit<
  Transfer,
  "createdAt" | "updatedAt" | "sourceAccount" | "destinationAccount"
>;

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
      destinationAccountId: "sourceAccount.id",
      sourceAccountId: "destinationAccount.id",
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

export async function deleteTransfer(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3333/transfer/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting transaction");
  }
}

export async function createTransfer(data: TransferCreate): Promise<void> {
  const response = await fetch("http://localhost:3333/transfer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creating transaction");
  }
}

export async function updateTransfer(data: TransferUpdate): Promise<void> {
  const response = await fetch(`http://localhost:3333/transfer/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error updating transaction");
  }
}
