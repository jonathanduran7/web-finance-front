import { Transfer } from "@/app/models/Transfer";
import DetailTransferModal from "./detail-transfer-modal";
import CreateTransferModal from "./create-transfer.modal";
import UpdateTransferModal from "./update-transfer-modal";

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
    case "edit":
      return (
        values && (
          <UpdateTransferModal
            isModalOpen={true}
            setIsModalOpen={onClose}
            values={values}
          />
        )
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
