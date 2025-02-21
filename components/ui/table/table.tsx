export interface TableProps {
  columns: IColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export interface IColumn {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: (row: any) => string | number;
}

export default function Table({ columns, data }: TableProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns?.map((column) => (
              <th key={column.name} className="p-2 mr-6 text-start">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: unknown, index: number) => (
            <tr
              key={index}
              className="mb-4 hover:bg-gray-100 hover:cursor-pointer"
            >
              {columns.map((column) => (
                <td key={column.name} className="p-2 mr-5">
                  {column.value
                    ? column.value(row)
                    : getNestedValue(row, column.name)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
