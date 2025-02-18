"use client";
import { Currency } from "@/app/models/Currency";
import { getCurrencies } from "@/app/services/api/currency.api";
import Accordion from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isLoading, error } = useQuery<Currency[]>({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="h-full">
      <h1>Settings</h1>
      <div className="w-[80%]">
        <Accordion title="Cuentas">
          <p>Cuenta</p>
        </Accordion>
        <Accordion title="Categorias">
          <p>Categorias</p>
        </Accordion>
        <Accordion title="Monedas">
          <p>Monedas</p>

          <ul>
            {data?.map((currency) => (
              <li key={currency.id}>{currency.name}</li>
            ))}
          </ul>
        </Accordion>
      </div>
    </div>
  );
}
