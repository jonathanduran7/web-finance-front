import { Category } from "@/app/models/Category";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch("http://localhost:3333/category");
  if (!response.ok) {
    throw new Error("Error fetching currencies");
  }
  return response.json() as Promise<Category[]>;
}

export async function createCategory(categoryName: string) {
  const response = await fetch("http://localhost:3333/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: categoryName }),
  });
  if (!response.ok) {
    throw new Error("Error creating category");
  }
}
