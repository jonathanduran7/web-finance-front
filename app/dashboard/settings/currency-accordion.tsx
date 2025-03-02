"use client";
import { Currency } from "@/app/models/Currency";
import { getCurrencies, removeCurrency } from "@/app/services/api/currency.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import ModalFactory from "./currency/modal-currency-factory";
import { useSnackbar } from "@/app/context/snackbar.context";

export default function CurrencyAccordion() {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<{
    type: "create" | "edit" | "none";
    values?: { id: string; currency: string };
  }>({ type: "none" });
  const { data, isLoading, error } = useQuery<Currency[]>({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  const { mutate } = useMutation({
    mutationFn: (id: string) => removeCurrency(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currencies"] });
      openSnackbar("Moneda eliminada", "success");
    },
    onError: () => {
      openSnackbar("Ocurrio un error al eliminar la moneda", "error");
    },
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error cargando las monedas</p>;
  }

  const handleEdit = (id: string, currency: string) => {
    setModal({ type: "edit", values: { id, currency } });
  };

  return (
    <div>
      <div className="flex p-2">
        <div className="font-bold w-4/5">Nombre</div>
        <div className="font-bold flex-1">Acciones</div>
      </div>
      <div className="mt-2">
        {!data?.length && (
          <div>
            No hay registros creados. Crea un registro para visualizarlo.
          </div>
        )}
        {data?.map((currency) => (
          <div
            key={currency.id}
            className="flex border-b border-b-slate-200 mb-2 p-2 hover:bg-gray-100 hover:cursor-pointer"
          >
            <div className="w-4/5">{currency.name}</div>
            <div className="flex-1">
              <button
                onClick={() => {
                  handleEdit(String(currency.id), currency.name);
                }}
                className="text-blue-500 mr-3"
              >
                <Edit />
              </button>
              <button
                className="text-red-500"
                onClick={() => mutate(String(currency.id))}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-primary text-white p-2 rounded-lg"
          onClick={() => setModal({ type: "create" })}
        >
          Agregar moneda
        </button>
      </div>

      <ModalFactory
        type={modal.type}
        values={modal.values}
        onClose={() => setModal({ type: "none" })}
      />
    </div>
  );
}
