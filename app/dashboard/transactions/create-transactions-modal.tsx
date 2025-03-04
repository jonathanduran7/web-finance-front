"use client";
import { useSnackbar } from "@/app/context/snackbar.context";
import { Account } from "@/app/models/Accounts";
import { Category } from "@/app/models/Category";
import { getAccount } from "@/app/services/api/account.api";
import { getCategories } from "@/app/services/api/category.api";
import { createTransaction } from "@/app/services/api/transactions.api";
import Modal from "@/components/ui/modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

type Inputs = {
  title: string;
  amount: number;
  description: string;
  date: string;
  accountId: number;
  categoryId: number;
};

export default function TransactionsModal({
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: Inputs) => {
    const formattedData = {
      ...data,
      amount: Number(
        data.amount
          .toString()
          .replace("$", "")
          .replace(/\./g, "")
          .replace(",", "."),
      ),
      accountId: Number(data.accountId),
      categoryId: Number(data.categoryId),
    };

    mutate(formattedData);
    setIsModalOpen(false);
    openSnackbar("Transacción creada", "success");
  };

  const { data: accounts } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: getAccount,
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { mutate } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["transactions"], exact: false });
    },
    onError: () => {
      openSnackbar("No se pudo guardar el registro correctamente", "error");
    },
  });

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="date"
              {...register("date", { required: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            />
            {errors.date && <span>La fecha es requerida</span>}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            />

            {errors.title && <span>El titulo es requerido</span>}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: false })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            />
          </div>

          <div className="mb-4">
            <select
              {...register("accountId", { required: true })}
              id="accountId"
              name="accountId"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none bg-white"
            >
              {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            {errors.accountId && <span>La cuenta es requerida</span>}
          </div>

          <div className="mb-4">
            <select
              {...register("categoryId", { required: true })}
              id="categoryId"
              name="categoryId"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none bg-white"
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <span>La categoria es requerida</span>}
          </div>

          <div className="mb-4">
            <Controller
              name="amount"
              control={control}
              rules={{ required: "El monto es requerido" }}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="$"
                  allowNegative={true}
                  decimalScale={2}
                  fixedDecimalScale
                  placeholder="$0.00"
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
                />
              )}
            />

            {errors.amount && <span>El monto es requerido</span>}
          </div>

          <button
            className={`mt-4 px-4 py-2 text-white rounded w-full ${isValid ? "bg-primary" : "bg-gray-400"}`}
            type="submit"
            disabled={!isValid}
          >
            Guardar
          </button>

          <button
            className="mt-2 px-4 py-2 bg-white text-primary rounded border border-primary w-full"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
