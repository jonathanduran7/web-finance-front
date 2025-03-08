"use client";
import { PaginatedResponse } from "@/app/interfaces/Response";
import { Dashboard } from "@/app/models/Dashboard";
import { Transaction } from "@/app/models/Transaction";
import {
  getDashboard,
  getTransactionsPaginated,
} from "@/app/services/api/transactions.api";
import Table from "@/components/ui/table/table";
import { formatCurrency } from "@/lib/format";
import { useQuery } from "@tanstack/react-query";
import { columns as columnsTransaction } from "../transactions/columns";
import { columns as columnsTransfer } from "../transfers/columns";
import { getTransferPaginated } from "@/app/services/api/transfer.api";
import { Transfer } from "@/app/models/Transfer";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function Page() {
  const { push } = useRouter();
  const { data, isError, isLoading } = useQuery<Dashboard>({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(),
  });

  const { data: transactions } = useQuery<PaginatedResponse<Transaction>>({
    queryKey: ["transactions"],
    queryFn: () => getTransactionsPaginated({ page: 1, limit: 5 }),
  });

  const { data: transfers } = useQuery<PaginatedResponse<Transfer>>({
    queryKey: ["transfers"],
    queryFn: () => getTransferPaginated({ page: 1, limit: 4 }),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  if (!data) return <div>No data</div>;

  return (
    <div className="overflow-hidden xs:overflow-auto">
      <h1 className="mb-4 text-3xl">Home</h1>
      <div className="flex gap-5 w-full justify-between flex-col xs:flex-row xs:gap-10">
        <div className="flex flex-col justify-between bg-gray-100 p-4 rounded-md">
          <p className="text-sm italic text-gray-400">Ingresos</p>
          <p className="mt-2 font-bold text-4xl">
            {formatCurrency(data.balance.income)}
          </p>
        </div>
        <div className="flex flex-col justify-between bg-gray-100 p-4 rounded-md">
          <p className="text-sm italic text-gray-400">Gastos</p>
          <p className="mt-2 font-bold text-4xl">
            {formatCurrency(data.balance.expense)}
          </p>
        </div>
        <div className="flex flex-col justify-between bg-gray-100 p-4 rounded-md">
          <p className="text-sm italic text-gray-400">Balance</p>
          <p className="mt-2 font-bold text-4xl">
            {formatCurrency(data.balance.total)}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-5">
        <div className="w-full md:w-[70%] p-4 order-2 md:order-1">
          {transactions && (
            <div>
              <h2 className="text-xl font-bold mb-2">Últimos movimientos</h2>
              <div className="hidden xs:block">
                <Table columns={columnsTransaction} data={transactions?.data} />
              </div>

              <div className="block xs:hidden">
                {transactions.data.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center mt-2 mb-4 bg-gray-100 p-2 rounded-md"
                  >
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <p>{dayjs(transaction.updatedAt).format("DD/MM")}</p>
                        <p>{transaction.title}</p>
                      </div>
                      <div>
                        <p>{transaction.account.name}</p>
                      </div>
                    </div>
                    <p>{formatCurrency(transaction.amount)}</p>
                  </div>
                ))}
              </div>
              <div>
                <p
                  className="text-primary text-center mt-4 cursor-pointer"
                  onClick={() => push("/dashboard/transactions")}
                >
                  Ver más
                </p>
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2 mt-4">
              Últimas transferencias
            </h2>
            {transfers && transfers.data.length ? (
              <div>
                <div className="hidden md:block">
                  <Table columns={columnsTransfer} data={transfers.data} />
                </div>
                <div className="block md:hidden">
                  {transfers.data.map((transfer) => (
                    <div
                      key={transfer.id}
                      className="flex justify-between items-center mt-2 mb-4 bg-gray-100 p-2 rounded-md"
                    >
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <p>{dayjs(transfer.updatedAt).format("DD/MM")}</p>
                          <div>
                            <p>{transfer.sourceAccount.name}</p>
                            <p>{transfer.destinationAccount.name}</p>
                          </div>
                        </div>
                      </div>
                      <p>{formatCurrency(transfer.amount)}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p
                    onClick={() => push("/dashboard/transfers")}
                    className="text-primary text-center mt-4 cursor-pointer"
                  >
                    Ver más
                  </p>
                </div>
              </div>
            ) : (
              <p>No hay transferencias</p>
            )}
          </div>
        </div>
        <div className="w-full flex md:w-[30%] flex-col gap-4 order-1 md:order-2">
          {data.categories.length ? (
            <div className="bg-gray-100 p-4 rounded-md mt-4 w-full">
              <h2 className="text-xl font-bold mb-2">Categorías</h2>
              <div className="w-full">
                {data.categories.map((category) => (
                  <div
                    key={category.category}
                    className="flex justify-between mt-2"
                  >
                    <p>{category.category}</p>
                    <p>{formatCurrency(category.total)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {data.accounts.length ? (
            <div className="bg-gray-100 p-4 rounded-md mt-4 w-full">
              <h2 className="text-xl font-bold mb-2">Cuentas</h2>
              <div className="w-full">
                {data.accounts.map((account) => (
                  <div
                    key={account.account}
                    className="flex justify-between mt-2"
                  >
                    <p>{account.account}</p>
                    <p>{formatCurrency(account.total)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
