export interface TableProps {
  columns: IColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export interface IColumn {
  name: string;
  label: string;
}

export default function Table({ columns, data }: TableProps) {
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
          {data.map((row, index) => (
            <tr key={index} className="mb-4">
              {columns.map((column) => (
                <td key={column.name} className="p-2 mr-5">
                  {row[column.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
