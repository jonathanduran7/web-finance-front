"use client";
import { useAuth } from "@/app/context/auth.context";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function Page() {
  const { handleLogin } = useAuth();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    handleLogin(data.email, data.password);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[400px] bg-gray-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="mt-4 w-full"
      >
        <div className="w-full mt-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
          />
        </div>
        <div className="w-full mt-5">
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            {...register("password", { required: true, minLength: 8 })}
          />
        </div>
        <button
          className={`mt-4 px-4 py-2 text-white rounded w-full ${isValid ? "bg-primary" : "bg-gray-400"}`}
          type="submit"
          disabled={!isValid}
        >
          Entrar
        </button>

        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg text-primary">
          <p className="cursor-pointer" onClick={() => push("/auth/register")}>
            No tengo una cuenta
          </p>
        </div>
      </form>
    </div>
  );
}
