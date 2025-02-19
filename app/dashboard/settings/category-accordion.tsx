import { Category } from "@/app/models/Category";
import { getCategories } from "@/app/services/api/category.api";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import ModalFactory from "./category/modal-category-factory";

export default function CategoryAccordion() {
  const [modal, setModal] = useState<{
    type: "create" | "edit" | "none";
    values?: { id: string; currency: string };
  }>({ type: "none" });
  const { data, isLoading, isError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError) {
    return <p>Error cargando las categorias</p>;
  }

  return (
    <div>
      <div className="flex p-2">
        <div className="font-bold w-4/5">Nombre</div>
        <div className="font-bold flex-1">Acciones</div>
      </div>

      <div className="mt-2">
        {data?.map((category) => (
          <div
            key={category.id}
            className="flex border-b border-b-slate-200 mb-2 p-2 hover:bg-gray-100 hover:cursor-pointer"
          >
            <div className="w-4/5">{category.name}</div>
            <div className="flex-1">
              <button className="text-blue-500 mr-3">
                <Edit />
              </button>
              <button className="text-red-500">
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setModal({ type: "create" })}
          className="bg-primary text-white p-2 rounded-lg"
        >
          Agregar Categoria
        </button>
      </div>
      <ModalFactory
        type={modal.type}
        values={modal.values}
        onClose={() => setModal({ type: "none" })}
      />
    </div>
  );
}
