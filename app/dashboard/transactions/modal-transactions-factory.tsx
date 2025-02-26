import { Transaction } from "@/app/models/Transaction";
import TransactionsModal from "./create-transactions-modal";
import UpdateTransactionModal from "./update-transaction-modal";
import DetailTransactionModal from "./detail-transactions-modal";

interface ModalFactoryProps {
  type: "create" | "edit" | "show" | "none";
  values?: Transaction;
  onClose: () => void;
}

export default function ModalFactory({
  type,
  onClose,
  values,
}: ModalFactoryProps) {
  switch (type) {
    case "create":
      return <TransactionsModal isModalOpen={true} setIsModalOpen={onClose} />;
    case "edit":
      return (
        values && (
          <UpdateTransactionModal
            isModalOpen={true}
            setIsModalOpen={onClose}
            values={values}
          />
        )
      );
    case "show":
      return (
        values && (
          <DetailTransactionModal
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
