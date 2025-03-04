const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Error logging in");
  }

  return response.json();
}

export async function register(
  email: string,
  password: string,
  confirmPassword: string,
) {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  });

  if (!response.ok) {
    throw new Error("Error logging in");
  }

  return response.json();
}
