"use client";
import { Dashboard } from "@/app/models/Dashboard";
import { getDashboard } from "@/app/services/api/transactions.api";
import { formatCurrency } from "@/lib/format";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isError, isLoading } = useQuery<Dashboard>({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  if (!data) return <div>No data</div>;

  return (
    <div>
      <h1 className="mb-4 text-3xl">Home</h1>
      <div className="flex gap-20">
        <div className="flex flex-col justify-between bg-gray-100 p-4 rounded-md w-[200px]">
          <p className="text-sm italic text-gray-400">Ingresos</p>
          <p className="mt-2 font-bold text-xl">
            {formatCurrency(data.balance.income)}
          </p>
        </div>
        <div className="flex flex-col justify-between bg-gray-100 p-4 rounded-md w-[200px]">
          <p className="text-sm italic text-gray-400">Gastos</p>
          <p className="mt-2 font-bold text-xl">
            {formatCurrency(data.balance.expense)}
          </p>
        </div>
        <div className="flex flex-col justify-between bg-gray-100 p-4 rounded-md w-[200px]">
          <p className="text-sm italic text-gray-400">Balance</p>
          <p className="mt-2 font-bold text-xl">
            {formatCurrency(data.balance.total)}
          </p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mt-4 w-[200px]">
        <h2 className="text-xl font-bold mb-2">Categorías</h2>
        <div className="w-full">
          {data.categories.map((category) => (
            <div key={category.category} className="flex justify-between mt-2">
              <p>{category.category}</p>
              <p>{formatCurrency(category.total)}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Cuentas</h2>
        <ul>
          {data.accounts.map((account) => (
            <li key={account.account}>
              {account.account}: {account.total}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
