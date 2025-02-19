import { Currency } from "@/app/models/Currency";

export async function getCurrencies(): Promise<Currency[]> {
  const response = await fetch("http://localhost:3333/currency");
  if (!response.ok) {
    throw new Error("Error fetching currencies");
  }
  return response.json() as Promise<Currency[]>;
}

export async function removeCurrency(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3333/currency/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting currency");
  }
}

export async function createCurrency(currencyName: string) {
  const response = await fetch("http://localhost:3333/currency", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: currencyName }),
  });
  if (!response.ok) {
    throw new Error("Error creating currency");
  }
}
