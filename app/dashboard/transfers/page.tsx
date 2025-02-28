"use client";
import { Transfer } from "@/app/models/Transfer";
import {
  deleteTransfer,
  getTransferPaginated,
} from "@/app/services/api/transfer.api";
import Table, { IColumn } from "@/components/ui/table/table";
import { formatCurrency } from "@/lib/format";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Edit, MessageSquarePlus, Trash } from "lucide-react";
import { useState } from "react";
import ModalFactory from "./modal-transfer-factory";
import Snackbar from "@/components/ui/snackbar";
import FooterTable from "./footer-table";
import { Account } from "@/app/models/Accounts";
import { getAccount } from "@/app/services/api/account.api";

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
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({
    sourceAccountId: "0",
    destinationAccountId: "0",
  });
  const [dates, setDates] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["transfers", querySearch, page, limit, filters, dates],
    queryFn: () =>
      getTransferPaginated({
        search: querySearch,
        page,
        limit,
        endDate: dates.endDate,
        startDate: dates.startDate,
        filters,
      }),
  });

  const { data: accounts } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: getAccount,
  });

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteTransfer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfers", querySearch] });
      setShowSnackbar(true);
      setMessage("Transferencia eliminada correctamente");
    },
  });

  const [modal, setModal] = useState<{
    type: "create" | "edit" | "show" | "none";
    values?: Transfer;
  }>({ type: "none" });

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
        setModal({ type: "edit", values: row });
      },
      icons: () => <Edit className="text-blue-500" />,
    },
    {
      label: "Eliminar",
      onClick: (row: Transfer) => {
        mutate(String(row.id));
      },
      icons: () => <Trash className="text-red-500" />,
    },
    {
      label: "Ver",
      onClick: (row: Transfer) => {
        setModal({ type: "show", values: row });
      },
      icons: () => <MessageSquarePlus className="text-black-500" />,
    },
  ];

  const handleSearch = () => {
    setQuerySearch(search);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
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
      <div className="flex gap-5 justify-end mb-5 w-[60%]">
        <div>
          <p className="mb-2">Cuenta Origen</p>
          <select
            name="sourceAccountId"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none bg-white"
            value={filters.sourceAccountId}
            onChange={(e) => handleFilter(e)}
          >
            <option value="">Todas</option>
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Cuenta Destino</p>
          <select
            name="destinationAccountId"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none bg-white"
            value={filters.destinationAccountId}
            onChange={(e) => handleFilter(e)}
          >
            <option value="">Todas</option>
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Fecha Inicio</p>
          <input
            type="date"
            name="startDate"
            value={dates.startDate}
            onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none bg-white"
          />
        </div>

        <div>
          <p className="mb-2">Fecha Fin</p>
          <input
            type="date"
            name="endDate"
            value={dates.endDate}
            onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none bg-white"
          />
        </div>
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
        <button
          onClick={() => setModal({ type: "create" })}
          className="bg-primary text-white p-2 rounded-md ml-2 w-[110px]"
        >
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
          <Table
            columns={columns}
            data={data.data}
            actions={actions}
            footer={
              <FooterTable data={data} setPage={setPage} setLimit={setLimit} />
            }
          />
        )}
      </div>
      <ModalFactory
        type={modal.type}
        onClose={() => setModal({ type: "none" })}
        values={modal.values}
      />

      {showSnackbar && (
        <Snackbar
          message={message}
          duration={3000}
          onClose={() => setShowSnackbar(false)}
        />
      )}
    </div>
  );
}
