import { Account } from "@/app/models/Accounts";
import { getAccount, removeAccount } from "@/app/services/api/account.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import ModalFactory from "./account/modal-account-factory";
import { useState } from "react";

export default function AccountAccordion() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: getAccount,
  });

  const { mutate } = useMutation({
    mutationFn: removeAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
  const [modal, setModal] = useState<{
    type: "create" | "edit" | "none";
    values?: {
      id: string;
      account: string;
      currencyId: string;
      initialBalance: number;
    };
  }>({ type: "none" });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError) {
    return <p>Error cargando las cuentas</p>;
  }

  return (
    <div>
      <div className="flex p-2">
        <div className="font-bold w-2/5">Nombre</div>
        <div className="font-bold w-2/5">Moneda</div>
        <div className="font-bold w-1/5">Acciones</div>
      </div>

      <div className="mt-2">
        {data?.map((account) => (
          <div
            key={account.id}
            className="flex border-b border-b-slate-200 mb-2 p-2 hover:bg-gray-100 hover:cursor-pointer"
          >
            <div className="w-2/5">{account.name}</div>
            <div className="w-2/5">{account.currency?.name ?? "-"}</div>
            <div className="w-1/5">
              <button
                onClick={() =>
                  setModal({
                    type: "edit",
                    values: {
                      id: String(account.id),
                      account: account.name,
                      currencyId: String(account.currency.id),
                      initialBalance: account.initialBalance,
                    },
                  })
                }
                className="text-blue-500 mr-3"
              >
                <Edit />
              </button>
              <button
                onClick={() => mutate(String(account.id))}
                className="text-red-500"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setModal({ type: "create" })}
          className="bg-primary text-white p-2 rounded-lg"
        >
          Agregar Cuenta
        </button>
      </div>

      <ModalFactory
        onClose={() => setModal({ type: "none" })}
        type={modal.type}
        values={{
          id: modal.values?.id ?? "",
          name: modal.values?.account ?? "",
          currencyId: Number(modal.values?.currencyId),
          initialBalance: modal.values?.initialBalance ?? 0,
        }}
      />
    </div>
  );
}
