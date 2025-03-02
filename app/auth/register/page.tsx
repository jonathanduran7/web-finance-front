"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Page() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm<Inputs>();

  return (
    <div className="flex flex-col items-center justify-center w-[400px] bg-gray-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold">Apertura de cuenta</h1>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
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
        <div className="w-full mt-5">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            {...register("confirmPassword", {
              required: true,
              minLength: 8,
              validate: (value) => value === getValues("password"),
            })}
          />
        </div>
        <button
          className={`mt-4 px-4 py-2 text-white rounded w-full ${isValid ? "bg-primary" : "bg-gray-400"}`}
          type="submit"
          disabled={!isValid}
        >
          Registrarme
        </button>

        <div className="flex flex-col items-center justify-center w-[400px] bg-gray-100 p-4 rounded-lg text-primary">
          <p className="cursor-pointer" onClick={() => push("/auth/login")}>
            Ya tengo una cuenta
          </p>
        </div>
      </form>
    </div>
  );
}
