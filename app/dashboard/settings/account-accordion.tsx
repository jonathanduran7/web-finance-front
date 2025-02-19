import { Account } from "@/app/models/Accounts";
import { getAccount } from "@/app/services/api/account.api";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";

export default function AccountAccordion() {
  const { data, isLoading, isError } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: getAccount,
  });

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
              <button className="text-blue-500 mr-3">
                <Edit />
              </button>
              <button className="text-red-500">
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button className="bg-primary text-white p-2 rounded-lg">
          Agregar Cuenta
        </button>
      </div>
    </div>
  );
}
