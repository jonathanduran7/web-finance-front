import { Transfer } from "@/app/models/Transfer";
import DetailTransferModal from "./detail-transfer-modal";
import CreateTransferModal from "./create-transfer.modal";

interface ModalFactoryProps {
  type: "create" | "edit" | "show" | "none";
  values?: Transfer;
  onClose: () => void;
}

export default function ModalFactory({
  type,
  onClose,
  values,
}: ModalFactoryProps) {
  switch (type) {
    case "create":
      return (
        <CreateTransferModal isModalOpen={true} setIsModalOpen={onClose} />
      );
    case "show":
      return (
        values && (
          <DetailTransferModal
            isModalOpen={true}
            setIsModalOpen={onClose}
            values={values}
          />
        )
      );
    default:
      return null;
  }
}
