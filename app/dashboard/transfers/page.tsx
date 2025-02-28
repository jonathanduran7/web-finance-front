"use client";
import { Transfer } from "@/app/models/Transfer";
import { getTransferPaginated } from "@/app/services/api/transfer.api";
import Table, { IColumn } from "@/components/ui/table/table";
import { formatCurrency } from "@/lib/format";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Edit, MessageSquarePlus, Trash } from "lucide-react";

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

  const actions = [
    {
      label: "Editar",
      onClick: (row: Transfer) => {
        console.log(row);
      },
      icons: () => <Edit className="text-blue-500" />,
    },
    {
      label: "Eliminar",
      onClick: (row: Transfer) => {
        console.log(row);
      },
      icons: () => <Trash className="text-red-500" />,
    },
    {
      label: "Ver",
      onClick: (row: Transfer) => {
        console.log(row);
      },
      icons: () => <MessageSquarePlus className="text-black-500" />,
    },
  ];

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
          <Table columns={columns} data={data.data} actions={actions} />
        )}
      </div>
    </div>
  );
}
