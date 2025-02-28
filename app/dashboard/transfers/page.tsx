"use client";
import { Transfer } from "@/app/models/Transfer";
import { getTransferPaginated } from "@/app/services/api/transfer.api";
import Table, { IColumn } from "@/components/ui/table/table";
import { formatCurrency } from "@/lib/format";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Edit, MessageSquarePlus, Trash } from "lucide-react";
import { useState } from "react";

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
  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["transfers", querySearch],
    queryFn: () =>
      getTransferPaginated({
        search: querySearch,
      }),
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

  const handleSearch = () => {
    setQuerySearch(search);
  };

  return (
    <div>
      <div className="w-[60%]">
        <p className="mb-4 text-3xl">Transferencias</p>
        <p className="mb-4 text-gray-500 text-sm">
          Aquí puedes ver todas las transferencias realizadas en tu cuenta.{" "}
          <br /> Puedes filtrar por fecha, monto, cuenta de origen y cuenta de
          destino.
        </p>
      </div>
      <div className="flex justify-end mb-5 w-[60%]">
        <input
          type="text"
          placeholder="Buscar por titulo o descripcion"
          className="w-[400px] p-2 border border-gray-300 rounded-md outline-none"
          value={search}
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="bg-primary text-white p-2 rounded-md ml-2 w-[110px]">
          Crear
        </button>
      </div>
      <div className="w-[60%]">
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
