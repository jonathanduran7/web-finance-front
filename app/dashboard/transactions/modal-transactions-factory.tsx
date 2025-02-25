import TransactionsModal from "./create-transactions-modal";
import UpdateTransactionModal from "./update-transaction-modal";

interface ModalFactoryProps {
  type: "create" | "edit" | "none";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values?: any;
  onClose: () => void;
}

export default function ModalFactory({ type, onClose }: ModalFactoryProps) {
  switch (type) {
    case "create":
      return <TransactionsModal isModalOpen={true} setIsModalOpen={onClose} />;
    case "edit":
      return (
        <UpdateTransactionModal isModalOpen={true} setIsModalOpen={onClose} />
      );
    default:
      return null;
  }
}
