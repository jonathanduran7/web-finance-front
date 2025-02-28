"use client";
import { getTransferPaginated } from "@/app/services/api/transfer.api";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["transfers"],
    queryFn: () => getTransferPaginated({}),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <div>
        <p className="mb-4 text-3xl">Transferencias</p>
        <p className="mb-4 text-gray-500 text-sm w-[60%]">
          Aquí puedes ver todas las transferencias realizadas en tu cuenta.{" "}
          <br /> Puedes filtrar por fecha, monto, cuenta de origen y cuenta de
          destino.
        </p>
      </div>
      <div>
        {data?.data.length === 0 && (
          <div className="w-full flex justify-center mt-4 text-center text-sm text-gray-500 italic">
            No hay registros disponibles. <br />
            Crea nuevos registros para visualizarlos
          </div>
        )}
        {data?.data.map((transfer) => (
          <div key={transfer.id}>
            <div>{transfer.sourceAccount.name}</div>
            <div>{transfer.destinationAccount.name}</div>
            <div>{transfer.amount}</div>
            <div>{transfer.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
