import Modal from "@/components/ui/modal";

interface CurrencyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function CurrencyModal({
  isModalOpen,
  setIsModalOpen,
}: CurrencyModalProps) {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>Monedas</Modal.Header>
      <Modal.Body>Ingrese el nombre de la moneda</Modal.Body>
      <Modal.Footer>
        <div className="flex flex-col">
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded">
            Guardar
          </button>
          <button className="mt-4 px-4 py-2 bg-white text-primary rounded border border-primary">
            Cancelar
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
