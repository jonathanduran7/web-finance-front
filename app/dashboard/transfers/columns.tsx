import { Transfer } from "@/app/models/Transfer";
import { IColumn } from "@/components/ui/table/table";
import { formatCurrency } from "@/lib/format";
import dayjs from "dayjs";

export const columns: IColumn[] = [
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
