import { PaginatedResponse } from "@/app/interfaces/Response";
import { Transaction } from "@/app/models/Transaction";

interface Props {
  data: PaginatedResponse<Transaction>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export default function FooterTable({ data, setPage, setLimit }: Props) {
  const handlePrevious = (page: number) => {
    setPage(page);
  };

  const handleNext = (page: number) => {
    setPage(page);
  };

  const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
  };

  return (
    <div className="flex justify-between bg-gray-100 p-4 items-center rounded">
      <p>
        Mostrando {data.data.length} de {data.total}
      </p>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          Ver:
          <select
            name="limit"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none bg-white"
            onChange={(e) => handleLimit(e)}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>

        {data.previousPage && (
          <button
            className="p-2 bg-gray-200 rounded-lg"
            onClick={() => handlePrevious(data.previousPage || 1)}
            disabled={!data.previousPage}
          >
            Anterior
          </button>
        )}

        {data.nextPage && (
          <button
            className="p-2 bg-gray-200 rounded-lg"
            onClick={() => handleNext(data.nextPage || 1)}
            disabled={!data.nextPage}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
