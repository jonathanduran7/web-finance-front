"use client";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/app/interfaces/Response";
import { Transaction } from "@/app/models/Transaction";
import { getTransactionsPaginated } from "@/app/services/api/transactions.api";
import Table, { IColumn } from "@/components/ui/table/table";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";
import ModalFactory from "./modal-transactions-factory";

const columns: IColumn[] = [
  {
    name: "createdAt",
    label: "Fecha",
    value: (row: Transaction) => dayjs(row.createdAt).format("DD/MM"),
  },
  { name: "title", label: "Titulo" },
  { name: "category.name", label: "Categoria" },
  { name: "account.name", label: "Cuenta" },
  {
    name: "amount",
    label: "Importe",
    value: (row: Transaction) => formatCurrency(row.amount),
  },
];

export default function Page() {
  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<PaginatedResponse<Transaction>>({
    queryKey: ["transactions", querySearch],
    queryFn: () =>
      getTransactionsPaginated({ page: 1, limit: 10, search: querySearch }),
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
    return <p>Error cargando las transacciones</p>;
  }

  if (!response) {
    return <p>No hay datos</p>;
  }

  const handleSearch = () => {
    setQuerySearch(search);
  };

  return (
    <div>
      <p>Transaction</p>
      <div className="w-[70%] mt-5">
        <div className="w-full">
          <input
            type="text"
            placeholder="Buscar"
            className="w-[300px] p-2 border border-gray-300 rounded-md outline-none"
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-primary text-white p-2 rounded-md ml-2"
            onClick={() => handleSearch()}
          >
            Buscar
          </button>
          <button
            onClick={() => setModal({ type: "create" })}
            className="bg-primary text-white p-2 rounded-md ml-2"
          >
            Crear
          </button>
        </div>
        <Table columns={columns} data={response.data} />
      </div>
      <ModalFactory
        type={modal.type}
        onClose={() => setModal({ type: "none" })}
      />
    </div>
  );
}
