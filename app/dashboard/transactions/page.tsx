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
import { Edit, MessageSquarePlus, Trash } from "lucide-react";
import FooterTable from "./footer-table";
import { Account } from "@/app/models/Accounts";
import { getAccount } from "@/app/services/api/account.api";
import { Category } from "@/app/models/Category";
import { getCategories } from "@/app/services/api/category.api";

const columns: IColumn[] = [
  {
    name: "createdAt",
    label: "Fecha",
    value: (row: Transaction) => dayjs(row.updatedAt).format("DD/MM"),
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
  const [filters, setFilters] = useState<Record<string, string>>({
    accountId: "0",
    categoryId: "0",
  });
  const [dates, setDates] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<PaginatedResponse<Transaction>>({
    queryKey: ["transactions", querySearch, page, limit, filters, dates],
    queryFn: () =>
      getTransactionsPaginated({
        page,
        limit,
        search: querySearch,
        filters,
        startDate: dates.startDate,
        endDate: dates.endDate,
      }),
  });

  const [modal, setModal] = useState<{
    type: "create" | "edit" | "show" | "none";
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

  const { data: accounts } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: getAccount,
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
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
    {
      label: "Ver",
      onClick: (row: Transaction) => {
        setModal({ type: "show", values: row });
      },
      icons: () => <MessageSquarePlus className="text-black-500" />,
    },
  ];

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <p className="mb-4 text-3xl">Movimientos</p>
      <p className="mb-4 text-gray-500 text-sm w-[60%]">
        Aqui podras visualizar todos los movimientos que has realizado en tus
        cuentas y categorias. <br /> Además, podras filtrar por cuenta,
        categoria y rango de fechas.
      </p>
      <div className="w-[60%]">
        <div className="mt-5">
          <div className="w-full flex justify-end mb-5  flex-wrap gap-5">
            <div>
              <p className="mb-2">Cuenta</p>
              <select
                name="accountId"
                className="w-full border border-gray-300 rounded px-4 py-2 outline-none bg-white"
                value={filters.accountId}
                onChange={(e) => handleFilter(e)}
              >
                <option value={0}>Todas</option>
                {accounts?.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-5">
              <p className="mb-2">Categoria</p>
              <select
                name="categoryId"
                className="w-full border border-gray-300 rounded px-4 py-2 outline-none bg-white"
                value={filters.categoryId}
                onChange={(e) => handleFilter(e)}
              >
                <option value={0}>Todas</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-5">
              <p className="mb-2">Fecha Inicio</p>
              <input
                type="date"
                name="startDate"
                value={dates.startDate}
                className="w-full border border-gray-300 rounded px-4 py-2 outline-none bg-white"
                onChange={(e) => handleDate(e)}
              />
            </div>

            <div className="ml-5">
              <p className="mb-2">Fecha Fin</p>
              <input
                type="date"
                name="endDate"
                value={dates.endDate}
                className="w-full border border-gray-300 rounded px-4 py-2 outline-none bg-white"
                onChange={(e) => handleDate(e)}
              />
            </div>
          </div>
          <div className="w-full flex justify-end mb-5">
            <input
              type="text"
              placeholder="Buscar por titulo o descripcion"
              className="w-[400px] p-2 border border-gray-300 rounded-md outline-none"
              value={search}
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={() => setModal({ type: "create" })}
              className="bg-primary text-white p-2 rounded-md ml-2 w-[110px]"
            >
              Crear
            </button>
          </div>
          {!response.data.length ? (
            <div className="w-full flex justify-center mt-4 text-center text-sm text-gray-500 italic">
              No hay registros disponibles. <br />
              Crea nuevos registros para visualizarlos
            </div>
          ) : (
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
          )}
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
