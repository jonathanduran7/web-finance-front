import { useSnackbar } from "@/app/context/snackbar.context";
import { Account } from "@/app/models/Accounts";
import { Transfer } from "@/app/models/Transfer";
import { getAccount } from "@/app/services/api/account.api";
import { updateTransfer } from "@/app/services/api/transfer.api";
import Modal from "@/components/ui/modal";
import { getFormattedDate } from "@/lib/format";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  values: Transfer;
}

type Inputs = {
  sourceAccountId: number;
  destinationAccountId: number;
  amount: number;
  description: string;
  date: string;
};

export default function UpdateTransferModal({
  isModalOpen,
  values,
  setIsModalOpen,
}: Props) {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<Inputs>({
    defaultValues: {
      sourceAccountId: values.sourceAccount.id,
      destinationAccountId: values.destinationAccount.id,
      amount: parseFloat(values.amount.toString()),
      description: values.description,
      date: getFormattedDate(values.updatedAt),
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateTransfer,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["transfers"] });
      setIsModalOpen(false);
      openSnackbar("Transferencia actualizada", "success");
    },
    onError: () => {
      openSnackbar("Ocurrio un error al actualizar la transferencia", "error");
    },
  });

  const { data: accounts } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: getAccount,
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
      sourceAccountId: Number(data.sourceAccountId),
      destinationAccountId: Number(data.destinationAccountId),
    };

    mutate({ id: values.id, ...formattedData });
  };
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
            <select
              {...register("sourceAccountId", { required: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none bg-white"
            >
              <option value="">Selecciona una cuenta de origen</option>
              {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            {errors.sourceAccountId && (
              <span>La cuenta de origen es requerida</span>
            )}
          </div>

          <div className="mb-4">
            <select
              {...register("destinationAccountId", { required: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none bg-white"
            >
              <option value="">Selecciona una cuenta de destino</option>
              {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            {errors.destinationAccountId && (
              <span>La cuenta de destino es requerida</span>
            )}
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

          <div className="mb-4">
            <input
              type="text"
              placeholder="Descripcion"
              {...register("description", { required: false })}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
            />
          </div>

          <div>
            <button
              className={`mt-4 px-4 py-2 text-white rounded w-full ${isValid ? "bg-primary" : "bg-gray-400"}`}
              type="submit"
              disabled={!isValid}
            >
              Editar
            </button>

            <button
              className="mt-2 px-4 py-2 bg-white text-primary rounded border border-primary w-full"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
