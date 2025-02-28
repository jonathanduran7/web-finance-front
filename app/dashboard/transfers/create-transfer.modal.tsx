import Modal from "@/components/ui/modal";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function CreateTransferModal({
  isModalOpen,
  setIsModalOpen,
}: Props) {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Body>
        hola
        <div>
          <button
            className={`mt-4 px-4 py-2 text-white rounded w-full bg-primary`}
          >
            Guardar
          </button>

          <button
            className="mt-2 px-4 py-2 bg-white text-primary rounded border border-primary w-full"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
