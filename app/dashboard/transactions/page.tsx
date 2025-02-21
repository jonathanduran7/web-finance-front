import Table, { IColumn } from "@/components/ui/table/table";

const columns: IColumn[] = [
  { name: "fecha", label: "Fecha" },
  { name: "descripcion", label: "Descripción" },
  { name: "categoria", label: "Categoría" },
  { name: "cuenta", label: "Cuenta" },
  { name: "importe", label: "Importe" },
];

const data = [
  {
    fecha: "2021-01-01",
    descripcion: "Pago de luz",
    categoria: "Servicios",
    cuenta: "Cuenta de ahorro",
    importe: 100,
  },
  {
    fecha: "2021-01-02",
    descripcion: "Pago de agua",
    categoria: "Servicios",
    cuenta: "Cuenta de ahorro",
    importe: 50,
  },
  {
    fecha: "2021-01-03",
    descripcion: "Pago de internet",
    categoria: "Servicios",
    cuenta: "Cuenta de ahorro",
    importe: 80,
  },
  {
    fecha: "2021-01-04",
    descripcion: "Pago de gas",
    categoria: "Servicios",
    cuenta: "Cuenta de ahorro",
    importe: 70,
  },
];

export default function Page() {
  return (
    <div>
      <p>Transaction</p>
      <Table columns={columns} data={data} />
    </div>
  );
}
