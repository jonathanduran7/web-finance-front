import { Category } from "@/app/models/Category";

export async function getCategories(): Promise<Category[]> {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch("http://localhost:3333/category", {
    headers: {
      Authorization: `Bearer ${token!.access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching currencies");
  }
  return response.json() as Promise<Category[]>;
}

export async function createCategory(categoryName: string) {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch("http://localhost:3333/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.access_token}`,
    },
    body: JSON.stringify({ name: categoryName }),
  });
  if (!response.ok) {
    throw new Error("Error creating category");
  }
}

export async function removeCategory(id: string): Promise<void> {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`http://localhost:3333/category/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token!.access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error deleting category");
  }
}

export async function updateCategory({
  categoryName,
  categoryId,
}: {
  categoryName: string;
  categoryId: string;
}) {
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`http://localhost:3333/category/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.access_token}`,
    },
    body: JSON.stringify({ name: categoryName }),
  });
  if (!response.ok) {
    throw new Error("Error updating category");
  }
}
