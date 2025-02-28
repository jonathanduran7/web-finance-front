import { Transfer } from "@/app/models/Transfer";
import DetailTransferModal from "./detail-transfer-modal";

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
