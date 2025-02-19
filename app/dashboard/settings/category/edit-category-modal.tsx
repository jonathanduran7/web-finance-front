"use client";

import { updateCategory } from "@/app/services/api/category.api";
import Modal from "@/components/ui/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface CategoryModalProps {
  values: {
    id: string;
    category: string;
  };
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function CategoryUpdateModal({
  isModalOpen,
  setIsModalOpen,
  values,
}: CategoryModalProps) {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState(values.category);

  useEffect(() => {
    if (isModalOpen) {
      setCategory(values.category);
    }
  }, [values.category, isModalOpen]);

  const { mutate } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleSave = () => {
    mutate({ categoryName: category, categoryId: values.id });
    setCategory("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCategory("");
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>Categorias</Modal.Header>
      <Modal.Body>
        <p>Edite el nombre</p>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
          placeholder="Nombre de la categoria"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></input>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-col mt-6">
          <button
            onClick={() => handleSave()}
            disabled={!category}
            className={`mt-4 px-4 py-2 text-white rounded ${!category ? "bg-gray-400" : "bg-primary"}`}
          >
            Editar
          </button>
          <button
            onClick={() => handleCancel()}
            className="mt-2 px-4 py-2 bg-white text-primary rounded border border-primary"
          >
            Cancelar
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
