import { Transaction } from "@/app/models/Transaction";
import { IColumn } from "@/components/ui/table/table";
import { formatCurrency } from "@/lib/format";
import dayjs from "dayjs";

export const columns: IColumn[] = [
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
