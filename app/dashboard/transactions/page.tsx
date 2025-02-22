"use client";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/app/interfaces/Response";
import { Transaction } from "@/app/models/Transaction";
import { getTransactionsPaginated } from "@/app/services/api/transactions.api";
import Table, { IColumn } from "@/components/ui/table/table";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/format";
import HeaderTableTransaction from "./header-table-transactions";

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
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<PaginatedResponse<Transaction>>({
    queryKey: ["transactions"],
    queryFn: () => getTransactionsPaginated({ page: 1, limit: 10 }),
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError) {
    return <p>Error cargando las transacciones</p>;
  }

  if (!response) {
    return <p>No hay datos</p>;
  }

  return (
    <div>
      <p>Transaction</p>
      <div className="w-[70%] mt-5">
        <HeaderTableTransaction />
        <Table columns={columns} data={response.data} />
      </div>
    </div>
  );
}
