import { JSX } from "react";

export interface TableProps<T> {
  columns: IColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  actions?: IAction<T>[];
  footer?: JSX.Element;
}

export interface IColumn {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: (row: any) => string | number;
}

export interface IAction<T> {
  label: string;
  onClick: (row: T) => void;
  icons: () => JSX.Element;
}

export default function Table<T>({
  columns,
  data,
  actions,
  footer,
}: TableProps<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr>
            {columns?.map((column) => (
              <th key={column.name} className="p-2 mr-6 text-start">
                {column.label}
              </th>
            ))}
            {actions && <th className="p-2">Acciones</th>}
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
              {actions && (
                <td className="p-2 flex gap-3">
                  {actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => action.onClick(row as T)}
                    >
                      {action.icons()}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {footer && <div>{footer}</div>}
    </div>
  );
}
