import { Currency } from "@/app/models/Currency";

export async function getCurrencies(): Promise<Currency[]> {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch("http://localhost:3333/currency", {
    headers: {
      Authorization: `Bearer ${token!.access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching currencies");
  }
  return response.json() as Promise<Currency[]>;
}

export async function removeCurrency(id: string): Promise<void> {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`http://localhost:3333/currency/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token!.access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error deleting currency");
  }
}

export async function createCurrency(currencyName: string) {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch("http://localhost:3333/currency", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.access_token}`,
    },
    body: JSON.stringify({ name: currencyName }),
  });
  if (!response.ok) {
    throw new Error("Error creating currency");
  }
}

export async function updateCurrency({
  currencyName,
  currencyId,
}: {
  currencyName: string;
  currencyId: string;
}) {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`http://localhost:3333/currency/${currencyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.access_token}`,
    },
    body: JSON.stringify({ name: currencyName }),
  });
  if (!response.ok) {
    throw new Error("Error updating currency");
  }
}
