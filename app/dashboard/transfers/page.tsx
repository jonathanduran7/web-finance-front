"use client";
import { Transfer } from "@/app/models/Transfer";
import { getTransferPaginated } from "@/app/services/api/transfer.api";
import Table, { IColumn } from "@/components/ui/table/table";
import { formatCurrency } from "@/lib/format";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const columns: IColumn[] = [
  {
    name: "updatedAt",
    label: "Fecha",
    value: (row: Transfer) => dayjs(row.updatedAt).format("DD/MM"),
  },
  {
    name: "sourceAccount.name",
    label: "Cuenta de origen",
  },
  {
    name: "destinationAccount.name",
    label: "Cuenta de destino",
  },
  {
    name: "amount",
    label: "Importe",
    value: (row: Transfer) => formatCurrency(row.amount),
  },
];

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
        {!data?.data.length ? (
          <div className="w-full flex justify-center mt-4 text-center text-sm text-gray-500 italic">
            No hay registros disponibles. <br />
            Crea nuevos registros para visualizarlos
          </div>
        ) : (
          <Table columns={columns} data={data.data} />
        )}
      </div>
    </div>
  );
}
