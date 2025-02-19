"use client";

import Modal from "@/components/ui/modal";
import { useState } from "react";

interface CurrencyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function CurrencyModal({
  isModalOpen,
  setIsModalOpen,
}: CurrencyModalProps) {
  const [currency, setCurrency] = useState("");

  const handleSave = () => {
    setCurrency("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCurrency("");
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>Monedas</Modal.Header>
      <Modal.Body>
        <p>Ingrese el nombre de la moneda</p>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2 mt-2 outline-none"
          placeholder="Nombre de la moneda"
          name="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        ></input>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-col mt-6">
          <button
            onClick={() => handleSave()}
            disabled={!currency}
            className={`mt-4 px-4 py-2 text-white rounded ${!currency ? "bg-gray-400" : "bg-primary"}`}
          >
            Guardar
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
