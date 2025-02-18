import { Currency } from "@/app/models/Currency";

export async function getCurrencies(): Promise<Currency[]> {
  const response = await fetch("http://localhost:3333/currency");
  if (!response.ok) {
    throw new Error("Error fetching currencies");
  }
  return response.json() as Promise<Currency[]>;
}
