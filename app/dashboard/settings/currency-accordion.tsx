"use client";
import { Currency } from "@/app/models/Currency";
import { getCurrencies, removeCurrency } from "@/app/services/api/currency.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";

export default function CurrencyAccordion() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Currency[]>({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  const { mutate } = useMutation({
    mutationFn: (id: string) => removeCurrency(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currencies"] });
    },
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error cargando las monedas</p>;
  }

  return (
    <div>
      <div className="flex p-2">
        <div className="font-bold w-4/5">Nombre</div>
        <div className="font-bold flex-1">Acciones</div>
      </div>
      <div className="mt-2">
        {data?.map((currency) => (
          <div
            key={currency.id}
            className="flex border-b border-b-slate-200 mb-2 p-2 hover:bg-gray-100 hover:cursor-pointer"
          >
            <div className="w-4/5">{currency.name}</div>
            <div className="flex-1">
              <button className="text-blue-500 mr-3">
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
    </div>
  );
}
