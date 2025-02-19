import { Category } from "@/app/models/Category";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch("http://localhost:3333/category");
  if (!response.ok) {
    throw new Error("Error fetching currencies");
  }
  return response.json() as Promise<Category[]>;
}
