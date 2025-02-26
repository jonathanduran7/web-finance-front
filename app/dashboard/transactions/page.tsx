"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse } from "@/app/interfaces/Response";
import { Transaction } from "@/app/models/Transaction";
import {
  deleteTransaction,
  getTransactionsPaginated,
} from "@/app/services/api/transactions.api";
import Table, { IColumn } from "@/components/ui/table/table";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";
import ModalFactory from "./modal-transactions-factory";
import { Edit, Trash } from "lucide-react";
import FooterTable from "./footer-table";

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
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<PaginatedResponse<Transaction>>({
    queryKey: ["transactions", querySearch, page, limit],
    queryFn: () =>
      getTransactionsPaginated({ page, limit, search: querySearch }),
  });

  const [modal, setModal] = useState<{
    type: "create" | "edit" | "none";
    values?: Transaction;
  }>({ type: "none" });

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", querySearch],
      });
    },
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

  const handleSearch = () => {
    setQuerySearch(search);
  };

  const actions = [
    {
      label: "Editar",
      onClick: (row: Transaction) => {
        setModal({ type: "edit", values: row });
      },
      icons: () => <Edit className="text-blue-500" />,
    },
    {
      label: "Eliminar",
      onClick: (row: Transaction) => {
        mutate(String(row.id));
      },
      icons: () => <Trash className="text-red-500" />,
    },
  ];

  return (
    <div>
      <p>Transaction</p>
      <div className="w-[60%]">
        <div className="mt-5">
          <div className="w-full flex justify-end mb-5">
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
          <Table
            columns={columns}
            data={response.data}
            actions={actions}
            footer={
              <FooterTable
                data={response}
                setPage={setPage}
                setLimit={setLimit}
              />
            }
          />
        </div>
      </div>
      <ModalFactory
        type={modal.type}
        values={modal.values}
        onClose={() => setModal({ type: "none" })}
      />
    </div>
  );
}
