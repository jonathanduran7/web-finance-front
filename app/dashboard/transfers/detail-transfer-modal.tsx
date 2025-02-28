import { Transfer } from "@/app/models/Transfer";
import Modal from "@/components/ui/modal";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  values: Transfer;
}

export default function DetailTransferModal({
  isModalOpen,
  setIsModalOpen,
  values,
}: Props) {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>
        <div className="flex gap-2">
          <p>#{values.id}</p> {values.sourceAccount.name} -{" "}
          {values.destinationAccount.name}
        </div>
      </Modal.Header>
      <Modal.Body>
        <p>{values.description || "No hay comentarios"}</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="p-2 bg-primary rounded-lg w-full text-white mt-5"
          onClick={() => setIsModalOpen(false)}
        >
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}
